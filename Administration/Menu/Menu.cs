namespace Webshop.Menu
{
    class Menu
    {
        public List<Option> Options;

        protected Dictionary<string, int> optionKeyToIndex;

        public bool BackOption;
        protected Menu? previousMenu;

        //public Menu()
        //{
        //    this.Options = new List<Option>();
        //    this.optionKeyToIndex = new Dictionary<string, int>();
        //}

        public Menu(List<Option>? options = null)
        {
            this.Options = options != null ? options : new List<Option>();
            this.optionKeyToIndex = new Dictionary<string, int>();

            this.BackOption = false;
            this.previousMenu = null;
        }

        public Menu(Menu previousMenu, List<Option>? options = null, bool backOption = true)
        {
            this.Options = this.Options = options != null ? options : new List<Option>();
            this.optionKeyToIndex = new Dictionary<string, int>();

            this.BackOption = backOption;
            this.previousMenu = previousMenu;

            this.Options.Insert(0, new Option("Vissza", this.previousMenu.Start, "0"));
        }

        public void Start()
        {
            if (this.Options.Count == 0) return;

            this.GenerateOptionKeys();
            int optionIdx = 0;
            bool success = false;
            while (!success)
            {
                this.Display();
                Console.WriteLine();

                string? read = this.TryGetOptionKeyFromConsole();
                if (read != null)
                {
                    optionIdx = this.optionKeyToIndex[read];
                    success = true;
                }
            }
            this.Options[optionIdx].Value();
        }

        protected void Display()
        {
            foreach ((string optionKey, int idx) in optionKeyToIndex)
            {
                Console.WriteLine($"[{optionKey}] {this.Options[idx].Name}"); 
            }
        }

        protected void GenerateOptionKeys()
        {
            this.optionKeyToIndex = new Dictionary<string, int>();
            int counter = 1;
            for (int i = 0; i < Options.Count; i++)
            {
                //Console.WriteLine($"Debug: {Options[i].OptionKey != null}");
                if (Options[i].OptionKey != null)
                {
                    if (optionKeyToIndex.Keys.Contains(Options[i].OptionKey))
                    {
                        int optionKeyNum = 2;
                        string newOptionKey;
                        do
                        {
                            newOptionKey = $"{Options[i].OptionKey}{++optionKeyNum}";
                        }
                        while (optionKeyToIndex.Keys.Contains(newOptionKey));

                        optionKeyToIndex.Add(newOptionKey, i);
                    } else
                    {
                        this.optionKeyToIndex.Add(Options[i].OptionKey, i);
                    }
                } else
                {
                    this.optionKeyToIndex.Add($"{counter++}", i);
                }
            }
        }

        protected string? TryGetOptionKeyFromConsole()
        {
            string? read = Console.ReadLine();
            if (read != null && this.optionKeyToIndex.Keys.Contains(read)) return read;
            else return null;
        }
    }
}
