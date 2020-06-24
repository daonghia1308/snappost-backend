/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {

  datastores: {

    default: {
      adapter: 'sails-mongo',
      url: "mongodb://snappost:snappost@cluster0-shard-00-00-t1hax.gcp.mongodb.net:27017,cluster0-shard-00-01-t1hax.gcp.mongodb.net:27017,cluster0-shard-00-02-t1hax.gcp.mongodb.net:27017/snappost?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
      // ssl: true,

    },

  },



  models: {

    migrate: 'safe',

    // cascadeOnDestroy: false,

  },


  blueprints: {
    shortcuts: false,
  },


  security: {

    cors: {
      allowOrigins: ["http://localhost", "http://35.232.6.168", "https://snappost.vercel.app"],
      // allowOrigins: "*",
      allowCredentials: false,
      // "Access-Control-Allow-Origin": "*",
      allowRequestHeaders: 'Content-Type, Accept,Authorization',
      allowRequestMethods: 'GET, POST, PUT,PATCH,DELETE',
    },

  },

  session: {

    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },

  },

  sockets: {

    onlyAllowOrigins: [
      'http://localhost:3000',
      'http://35.232.6.168:3000',
      "https://snappost.vercel.app"
    ],


  },

  log: {
    level: 'debug'
  },



  http: {

    cache: 365.25 * 24 * 60 * 60 * 1000, // One year


    // trustProxy: true,

  },


  // port: 80,



  // ssl: undefined,



  custom: {
    baseUrl: 'http://35.232.6.168:1337',
    internalEmailAddress: 'support@example.com',

    // mailgunDomain: 'mg.example.com',
    // mailgunSecret: 'key-prod_fake_bd32301385130a0bafe030c',
    // stripeSecret: 'sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking them in to version control, you might opt to
    // ||   set sensitive credentials like these using environment variables.
    //
    // For example:
    // ```
    // sails_custom__mailgunDomain=mg.example.com
    // sails_custom__mailgunSecret=key-prod_fake_bd32301385130a0bafe030c
    // sails_custom__stripeSecret=sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm
    // ```
    //--------------------------------------------------------------------------

  },



};
