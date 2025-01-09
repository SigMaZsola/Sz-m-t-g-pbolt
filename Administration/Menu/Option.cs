namespace Webshop.Menu
{
    class Option
    {
        public string Name;
        public Action Value;

        public string? OptionKey;

        public Option(string name, Action value, string? optionKey = null)
        {
            this.Name = name;
            this.Value = value;
            this.OptionKey = optionKey;
        }
    }
}
