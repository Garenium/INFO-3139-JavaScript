import got from "got";
const dumpJson = async () => {
    const srcAddr =
      "https://api.github.com/users/Garenium";
  
    // Create a currency formatter.
    try {
      const response = await got(srcAddr, { responseType: "json" });
  
      // strip out the Ontario amount
      let my_gh_username = response.body.login;
      let my_gh_realname = response.body.name;

      console.log(`My Github username: ${my_gh_username}\nMy Github real name: ${my_gh_realname}`);
 
    } catch (error) {
      console.log(error);
      //=> 'Internal server error ...'
    }
  };
  dumpJson();
  