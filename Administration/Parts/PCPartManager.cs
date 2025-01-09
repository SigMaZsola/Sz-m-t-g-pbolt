namespace Webshop.Parts
{
    class PCPartManager
    {
        public List<PCPart> Parts;

        public PCPartManager()
        {
            Parts = new List<PCPart>();
        }

        public void WritePartsToFile(string partSpecsFileName, string componentSpecsFileName)
        {
            using (StreamWriter partSpecsFile = new StreamWriter(partSpecsFileName)) //src.txt
            using (StreamWriter componentSpecsFile = new StreamWriter(componentSpecsFileName)) //specs.txt
            {
                foreach (PCPart part in this.Parts)
                {
                    partSpecsFile.Write($"0{part.GetType().Name};{part.Brand};{part.Model};{part.Price};");
                    componentSpecsFile.Write($"{part.GetType().Name}#");

                    bool first = true;
                    foreach ((string specName, object spec) in part.GetCustomSpecs())
                    {
                        if (first)
                        {
                            first = false;
                        } else
                        {
                            partSpecsFile.Write(';');
                            componentSpecsFile.Write(';');
                        }

                        partSpecsFile.Write(spec);
                        componentSpecsFile.Write($"{specName}:{spec.GetType().Name}");
                    }
                    partSpecsFile.WriteLine();
                    componentSpecsFile.WriteLine();
                }
            }
        }

        public void AddPart()
        {

        }
    }
}
