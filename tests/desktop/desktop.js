var username = 'dvt-etu';
var password = 'dvt-etu';

module.exports = async function(context, commands) {
    
  await commands.navigate('https://www.google.com')
  
    try {
      await commands.measure.start('main');
      // Navigate to a URL
      await commands.navigate(
        'https://ies-icvs-puma.ies.mentorg.com/#/login?returnUrl=%2F', 'main'
      );

      // Add text into an input field, finding the field by id
      await commands.addText.byXpath(username, '/html/body/viq-root/viq-layout/div/div[2]/div/viq-login/div/div/form/input[1]');
      await commands.addText.byXpath(password, '/html/body/viq-root/viq-layout/div/div[2]/div/viq-login/div/div/form/input[2]');

      await commands.wait.byXpath('/html/body/viq-root/viq-layout/div/div[2]/div/viq-login/div/div/form/viq-button/button', 40000);
  
      await commands.measure.stop();
      // Start the measurement and give it the alias login
      // The alias will be used when the metrics is sent to
      // Graphite/InfluxDB
      await commands.measure.start('login');
  
      // Find the submit button and click it and wait for the
      // page complete check to finish on the next loaded URL
      await commands.click.byXpathAndWait('/html/body/viq-root/viq-layout/div/div[2]/div/viq-login/div/div/form/viq-button/button');
      await commands.wait.byXpath('/html/body/viq-root/viq-layout/div/viq-header/div/div[1]/ul[1]/li[3]/div/a/span[2]', 40000)
     

      await commands.measure.stop();

      await commands.measure.start('link1');
      await commands.navigate('https://ies-icvs-puma.ies.mentorg.com/#/project/dashboard/32786903?projectId=23917102&projectTitle=QSim%20Perf%20QA%20Rpts')

      await commands.wait.byXpath('/html/body/viq-root/viq-layout/div/div[2]/div/viq-dashboard/div/viq-card[5]/div[1]/div/h5', 40000);
      await commands.wait.byTime(10000);
      return commands.measure.stop();  

      
    } catch (e) {
      // We try/catch so we will catch if the the input fields can't be found
      // The error is automatically logged in Browsertime an rethrown here
      // We could have an alternative flow ...
      // else we can just let it cascade since it caught later on and reported in
      // the HTML
      throw e;
    }
  };
