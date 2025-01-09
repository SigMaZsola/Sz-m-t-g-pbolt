using System.Globalization;
using Webshop.Parts;
using Webshop.Menu;

internal class Program
{
    static void Main(string[] args)
    {
        CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;

        CPU cpu = new CPU("Intel", "i5-11400F", 45000, 6, 2.60);
        RAM ram = new RAM("Kingston", "FURY Beast", 15000, "DDR4", 16, 3200, 1.35);

        PCPartManager partsManager = new PCPartManager();

        partsManager.Parts.Add(cpu);
        partsManager.Parts.Add(ram);

        partsManager.WritePartsToFile("src.txt", "specs.txt");

        Menu webshopMenu = new Menu();
        Menu InnerMenu = new Menu(webshopMenu);
        webshopMenu.Options = new List<Option>
        {
            new Option("Test1", () => Console.WriteLine("First")),
            new Option("Test2", () => Console.WriteLine("Second")),
            new Option("Test3", InnerMenu.Start)
        };
        InnerMenu.Options.AddRange(new List<Option>
        {
            new Option("InnerTest1", () => Console.WriteLine("InnerFirst")),
            new Option("InnerTest1", () => Console.WriteLine("InnerSecond")),
        });
        webshopMenu.Start();
    }
}
