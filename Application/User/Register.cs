using System;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Origin { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }

            public class Handler : IRequestHandler<Command>
            {
                private readonly DataContext _context;
                private readonly UserManager<AppUser> _userManager;
                private readonly IJwtGenerator _jwtGenerator;
                private readonly IEmailSender _emailSender;

                public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IEmailSender emailSender)
                {
                    _emailSender = emailSender;
                    _userManager = userManager;
                    _context = context;
                }
                public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                {
                    if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                        throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

                    if (await _context.Users.AnyAsync(x => x.UserName == request.Username))
                        throw new RestException(HttpStatusCode.BadRequest, new { Username = "Username already exists" });

                    var user = new AppUser
                    {
                        DisplayName = request.DisplayName,
                        Email = request.Email,
                        UserName = request.Username
                    };

                    var result = await _userManager.CreateAsync(user, request.Password);
                    //var result = await _userManager.CreateAsync(user);

                    if (!result.Succeeded) throw new Exception("Problem creating user");

                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

                    var verifyUrl = $"{request.Origin}/user/verifyEmail?token={token}&email={request.Email}";

                    var message = $"<p>Please click link to verify your email:</p><p><a href='{verifyUrl}'>{verifyUrl}></a></p>";

                    await _emailSender.SendEmailAsync(request.Email, "Please verify email address", message);

                    return Unit.Value;
                }
            }
        }
    }
}