package print

type printer interface {
    PrintPDF (filepath string) error
}

func DoJob(p printer, job string) error {
    // filepath = ...
    return p.PrintPDF(filepath)
}
