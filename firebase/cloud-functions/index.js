const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.energyMonitor = functions.database
  .ref("/{area}")
  .onWrite((change, context) => {

    const data = change.after.val();
    if (!data) return null;

    const current = data.current_usage_watts;
    const optimal = data.optimal_usage_watts;

    if (current > optimal * 1.3) {
      const message = {
        notification: {
          title: "Energy Alert ⚠️",
          body: `${context.params.area} consuming 40% excess power`
        },
        topic: "energy-alerts"
      };

      return admin.messaging().send(message);
    }

    return null;
  });
