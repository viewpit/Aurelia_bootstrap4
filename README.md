# Bootstrap 4 project (Aurelia, .NET Core 2.0, Webpack 3, TypeScript, Boostrap 4 and Sass)

This repository contains template for running Aurelia and ASP.NET Core 2.0 Sample Template, with Webpack 3, TypeScript, Bootstrap 4 and Sass.


### Setting Up Your Machine

First, there are a set of prerequisites you will need whether or not you are using Visual Studio. Make sure to install these prerequisites before proceeding.

* Install the .NET SDK 2.0 from https://www.microsoft.com/net/download/core
* [NodeJS](http://nodejs.org/) >=8.9.0 This provides the platform on which the build tooling runs. This may be downloaded and installed from the NodeJS website.
* NPM >=5.1.0 This is installed with NodeJS, but if you install a older version of NodeJS, you may have to update this. How to upgrade npm https://www.npmjs.com/package/npm-windows-upgrade


## How This Project Was Created

This prodject was created using the Microsoft.AspNetCore.SpaTemplates for Aurelia, width .NET Core 2.0.2
* Use the .NET CLI to install the ASP.NET Spa Templates. 
  * `dotnet new --install "Microsoft.AspNetCore.SpaTemplates::*"`
  * `dotnet new aurelia` - Generate an ASP.NET project configured with Aurelia using the .NET CLI.


## Running This Project Using Command Line Tools

In order to run this demo project, you need to setup your machine, restore the project dependencies, configure the environment and run the application.


###  Restoring The Project Dependencies

Since this project combines both .NET Core and Aurelia, you will need to install the dependencies for both the backend and the frontend. Here are the commands you need to run on the console:

* `dotnet restore` - This restores the .NET packages for the ASP.NET part of the application.
* `npm install` - This restores the JavaScript packages that comprise Aurelia along with the related frontend build and development tooling, such as Webpack and TypeScript.
* `dotnet run` - Start url: http://localhost:5000 

#### Bug fix 
If Node-sass was build for old node.js version, run:
* `npm rebuild node-sass --force -d` - This rebuild it for node 6 or 8.

If webpack build error:
* `FlagDependencyUsagePlugin.js const oldUsed = module.used`, then update Node (http://nodejs.org/) and NPM (https://www.npmjs.com/package/npm-windows-upgrade)


### Configuring Your Environment

* If you are using PowerShell on Windows, execute `$Env:ASPNETCORE_ENVIRONMENT = "Development"`
* If you are using cmd.exe on Windows, execute `setx ASPNETCORE_ENVIRONMENT "Development"`, and then restart your command prompt to make the change take effect.
* If you’re using Mac/Linux, execute `export ASPNETCORE_ENVIRONMENT=Development`


### Starting Up The Application

To run the application, simply execute `dotnet run` on the command line.


## Running This Project Using Visual Studio 2017

If you are on Windows, you have the option to use Visual Studio 2017 for your ASP.NET development. Simply use VS to open the .csproj file provided in this repository. 
When your dependencies have finished restoring, press Ctrl+F5 to launch the application in a browser.


### Third party documentation

* Bootstrap 4.0.0-beta.2 (http://getbootstrap.com/)
