<?php
// Contact form settings. Edit these on the server (or here before deploying).
return [
  // Where demo requests are sent.
  'to'        => 'contact@yesbook.ca',
  // Must be an address on your own domain, or IONOS may block the email.
  'from'      => 'website@yesbook.ca',
  'from_name' => 'Yesbook website',
  // Max messages per visitor per hour (simple spam protection).
  'rate_limit_per_hour' => 5,
];
