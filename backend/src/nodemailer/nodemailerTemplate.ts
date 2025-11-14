export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #C7326A, #b02a5a); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up with Rikha! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #C7326A;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Rikha Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #C7326A, #b02a5a); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #C7326A; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Rikha Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #C7326A, #b02a5a); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #C7326A; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Rikha Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_CHANGED_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Changed Successfully</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .body { background-color: #121212; color: #e0e0e0; }
      .container { background-color: #1e1e1e; }
      .footer { color: #aaaaaa; }
    }
  </style>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
  <div class="container" style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #e0e0e0;">
    
    <!-- Header -->
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee;">
      <h1 style="color: #C7326A; margin: 0; font-size: 28px;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: middle; margin-right: 10px;">
          <path d="M12 2L2 12h3v8h14v-8h3L12 2z" stroke="#C7326A" stroke-width="2" fill="none"/>
          <path d="M9 15l6-6m0 6l-6-6" stroke="#C7326A" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Password Updated
      </h1>
    </div>

    <!-- Main Content -->
    <div style="padding: 25px 0;">
      <p style="font-size: 16px; margin: 0 0 16px 0;"><strong>Hi {userName},</strong></p>
      
      <p style="font-size: 16px; margin: 16px 0;">
        Your password was successfully changed on <strong>{date}</strong> at <strong>{time}</strong> ({timeZone}).
      </p>

      <div style="background-color: #fdf2f8; border-left: 4px solid #C7326A; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
        <p style="margin: 0; color: #831843; font-size: 15px;">
          <strong>Device:</strong> {device} <br>
          <strong>Location:</strong> {location} <br>
          <strong>IP Address:</strong> {ipAddress}
        </p>
      </div>

      <p style="font-size: 16px; margin: 20px 0; line-height: 1.7;">
        If you made this change, you're all set! 
      </p>

      <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <p style="margin: 0; color: #92400e; font-weight: 600;">
          This change logged you out from all other devices for security.
        </p>
      </div>

      <p style="font-size: 16px; color: #dc2626; font-weight: 600; margin: 20px 0;">
        If you DID NOT make this change, <a href="{supportLink}" style="color: #dc2626; text-decoration: underline;">secure your account now</a>.
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="{loginLink}" style="background-color: #C7326A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
          Log In Securely
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer" style="border-top: 1px solid #eee; padding-top: 20px; color: #666; font-size: 13px; text-align: center;">
      <p style="margin: 8px 0;">
        This is an automated security alert from <strong>Rikha</strong>.
      </p>
      <p style="margin: 8px 0;">
        Need help? Contact us at <a href="mailto:security@rikha.store" style="color: #C7326A;">security@rikha.store</a>
      </p>
      <p style="margin: 16px 0 8px 0; font-size: 11px; color: #999;">
        © 2025 Rikha. All rights reserved.<br>
        Addis Ababa, Ethiopia
      </p>
    </div>
  </div>
</body>
</html>
`;