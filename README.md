# Workout project (Aurelia, .NET Core 2.0, Webpack 3, TypeScript, Boostrap 4)

This repository contains template for running Aurelia and ASP.NET Core 2.0 Sample Template, with Webpack 3, TypeScript, Bootstrap 4.
Using HTML Free Now Ui Kit from https://www.creative-tim.com/product/now-ui-kit (no jQuery plugin is active!)

## How This Project Was Created

This prodject was created using the Microsoft.AspNetCore.SpaTemplates for Aurelia, width .NET Core 2.0.
* Use the .NET CLI to install the ASP.NET Spa Templates. 
  * `dotnet new --install "Microsoft.AspNetCore.SpaTemplates::*"`
  * `dotnet new aurelia -f netcoreapp2.0` - Generate an ASP.NET project configured with Aurelia using the .NET CLI.

### Setting Up Your Machine

The following steps must be performed once on the target machine:

* Install the .NET SDK 2.0 from https://www.microsoft.com/net/download/core
* Install Node.js from https://nodejs.org (version >= 6.11.3)

## Running This Project Using Command Line Tools

In order to run this demo project, you need to setup your machine, restore the project dependencies, configure the environment and run the application.

###  Restoring The Project Dependencies

Since this project combines both .NET Core and Aurelia, you will need to install the dependencies for both the backend and the frontend. Here are the commands you need to run on the console:

* `dotnet restore` - This restores the .NET packages for the ASP.NET part of the application.
* `npm install` - This restores the JavaScript packages that comprise Aurelia along with the related frontend build and development tooling, such as Webpack and TypeScript.

### Configuring Your Environment

* If you are using PowerShell on Windows, execute `$Env:ASPNETCORE_ENVIRONMENT = "Development"`
* If you are using cmd.exe on Windows, execute `setx ASPNETCORE_ENVIRONMENT "Development"`, and then restart your command prompt to make the change take effect.
* If you’re using Mac/Linux, execute `export ASPNETCORE_ENVIRONMENT=Development`

Using Visual Studio
* Debug gzip and source map javascript. Vendor.js size 119KB, App.js size 205KB. Only restore wwwroot/dist and wwwroot/assets if run "Clean" or if folder dont exist!
* Release or Publish remove source map and max compress with UglifyJsPlugin. Vendor.js size 49KB, App.js size 104KB (89KB without home.html code). Always delete and create wwwroot/dist and wwwroot/assets!

### BundleAnalyzerPlugin is installed

To check whats bundle in App.js or Vendor.js, active "// new BundleAnalyzerPlugin()," in webpack.config.js or webpack.config.vendor.js
This can help you to find includes that makes App.js or Vendor.js to large!

### Starting Up The Application

To run the application, simply execute `dotnet run` on the command line.

## Running This Project Using Visual Studio 2017

If you are on Windows, you have the option to use Visual Studio 2017 for your ASP.NET development. Simply use VS to open the .csproj file provided in this repository. 
When your dependencies have finished restoring, press Ctrl+F5 to launch the application in a browser.
