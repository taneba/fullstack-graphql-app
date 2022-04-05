/* eslint-disable no-undef */
// this code only runs on the Auth0 rules
// Do not import or require any modules here.
function setRolesToUser(user, context, callback) {
  const namespace = "<NAMESPACE e.g. https://api.fullstack-graphql-app.com>";

  // if the user signed up already or is using a refresh token, just assign app_metadata.roles to the authtoken
  if (
    context.stats.loginsCount > 1 ||
    context.protocol === "oauth2-refresh-token" ||
    context.protocol === "redirect-callback" ||
    context.request.query.prompt === "none"
  ) {
    context.accessToken[namespace + "/roles"] = user.app_metadata.roles;
    return callback(null, user, context);
  }

  user.app_metadata = user.app_metadata || {};

  const addRolesToUser = function (context) {
    const role = context.request.query.role;
    if (role === "ADMIN") {
      return ["ADMIN"];
    } else {
      return ["USER"];
    }
  };

  const roles = addRolesToUser(context);

  user.app_metadata.roles = roles;
  auth0.users
    .updateAppMetadata(user.user_id, user.app_metadata)
    .then(function () {
      context.idToken[namespace] = user.app_metadata.roles;
      context.accessToken[namespace + "/roles"] = user.app_metadata.roles;
      callback(null, user, context);
    })
    .catch(function (err) {
      callback(err);
    });
}
