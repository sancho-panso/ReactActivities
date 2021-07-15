namespace Application.User
{
    public class FacebookUserInfo
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public FacebookPicture Picture { get; set; }
    }

    public class FacebookPicture
    {
        public string Url { get; set; }
    }
}