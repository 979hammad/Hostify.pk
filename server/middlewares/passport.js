import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const GOOGLE_CLIENT_ID = "68811845875-fmiar35ke8ssnd711hauhc69hg86ngj8.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

try {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        // Here, you might want to save the user profile to your database or perform other actions.
        return done(null, profile);
      }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        // Here, you might want to retrieve user information from your database based on the user's ID.
        done(null, user);
    });
} catch (error) {
    // Handle any errors that occur during passport configuration
    console.error("Error configuring passport:", error);
}

export default passport;
