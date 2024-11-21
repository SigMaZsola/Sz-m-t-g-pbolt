using System.Globalization;

namespace Webshop
{
    abstract class PCPart
    {
        public string Brand; //(Manufacturer) Intel
        public string Model; //i5-11400F
        public int Price;

        public PCPart(string brand, string model, int price)
        {
            this.Brand = brand;
            this.Model = model;
            this.Price = price;
        }

        public Dictionary<string, object> GetSpecifications(out Dictionary<string, Type> typeOfCustomSpecs)
        {
            Dictionary<string, object> specs = new Dictionary<string, object>
            {
                {"Brand", this.Brand},
                {"Model", this.Model},
                {"Price", this.Price}
            };

            typeOfCustomSpecs = new Dictionary<string, Type>();
            foreach (KeyValuePair<string, object> pair in this.getCustomSpecs())
            {
                specs.Add(pair.Key, pair.Value);
                typeOfCustomSpecs.Add(pair.Key, pair.Value.GetType());
            }

            return specs;
        }

        protected abstract Dictionary<string, object> getCustomSpecs();
    }

    class CPU : PCPart
    {
        public int Cores; //4
        public double ClockSpeed; //4.40 (in GHz)

        public CPU(string brand, string model, int price, int cores, double clockSpeed) : base(brand, model, price)
        {
            this.Cores = cores;
            this.ClockSpeed = clockSpeed;
        }

        protected override Dictionary<string, object> getCustomSpecs()
        {
            return new Dictionary<string, object>
            {
                {"Cores", this.Cores},
                {"ClockSpeed", this.ClockSpeed}
            };
        }
    }

    class RAM : PCPart
    {
        public string Type; //DDR4
        public int Capacity; //16 (in GB)
        public int Speed; //3200 (in MHz)
        public double Voltage; //1.2 (In V)

        public RAM(string brand, string model, int price, string type, int capacity, int speed, double voltage) : base(brand, model, price)
        {
            this.Type = type;
            this.Capacity = capacity;
            this.Speed = speed;
            this.Voltage = voltage;
        }

        protected override Dictionary<string, object> getCustomSpecs()
        {
            return new Dictionary<string, object>
            {
                {"Type", this.Type},
                {"Capacity", this.Capacity},
                {"Speed", this.Speed},
                {"Voltage", this.Voltage},
            };
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;

            CPU cpu = new CPU("Intel", "i5-11400F", 45000, 6, 2.60);
            RAM ram = new RAM("Kingston", "FURY Beast", 15000, "DDR4", 16, 3200, 1.35);

            List<PCPart> parts = new List<PCPart>();
            parts.Add(cpu);
            parts.Add(ram);


            using (StreamWriter specsFile = new StreamWriter("src.txt"))
            using (StreamWriter specsOrderFile = new StreamWriter("specs.txt"))
            {
                HashSet<string> partNamesSet = new HashSet<string>();

                foreach (PCPart part in parts)
                {
                    string partName = part.GetType().Name;
                    specsFile.Write(partName);

                    Dictionary<string, Type> orderOfSpecs;
                    foreach (KeyValuePair<string, object> spec in part.GetSpecifications(out orderOfSpecs))
                    {
                        specsFile.Write($";{spec.Value}");
                    }
                    specsFile.WriteLine();

                    if (partNamesSet.Add(partName))
                    {
                        specsOrderFile.Write($"{partName}#");
                        bool first = true;
                        foreach (KeyValuePair<string, Type> pair in orderOfSpecs)
                        {
                            if (first)
                            {
                                first = false;
                            }
                            else
                            {
                                specsOrderFile.Write(";");
                            }
                            specsOrderFile.Write($"{pair.Key}:{pair.Value.Name}");
                        }
                        specsOrderFile.WriteLine();
                    }
                }
            }
        }
    }
}