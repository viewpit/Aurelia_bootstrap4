import 'isomorphic-fetch';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';


declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export async function configure(aurelia: Aurelia) {

    aurelia.use.standardConfiguration();

    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    new HttpClient().configure(config => {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        config.withBaseUrl(baseUrl);
    });

    //aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap'),
    //    (config: BootstrapConfig) => {
    //        config.options.version = 4;
    //    });//.feature('resources');

    // Install and configure the plugin
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'));
    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app/components/app/app')));
}
