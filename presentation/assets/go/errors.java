static void printAllEMailAddresses(String urlString) throws MalformedURLException, IOException
{
  // ...
}

public static void main(String[] args)
{
  try
  {
    printAllEMailAddresses("https://google.com");
  }
  catch ( MalformedURLException e )
  {
    try
    {
      somethingElse();
    }
    catch ( SomeOtherException e )
    {
      System.err.println("Something went wrong");
    }
  }
}





















