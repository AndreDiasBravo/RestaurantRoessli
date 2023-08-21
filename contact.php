<?php	
			
			$to=' roessli.pinto@gmail.com ';
			$php_name = $_POST['ajax_name'];
			$php_phone = $_POST['ajax_phone'];
			$php_email = $_POST['ajax_email'];
			$php_address = $_POST['ajax_address'];
			$php_message = $_POST['ajax_message'];
			
				$subject='Contact Received For Restaurant Rossli';
 			
				
				$message ="<html><body><table align='center' boarder='1' cellpadding='5' cellspacing='2'  style='font-family:Verdana, Arial, Helvetica, sans-serif;font-size:12px;font-weight:bold;background-color:#CCCCFF;color:#000000;;border:double'>";
				
				 $message .= "<tr><td align='left'><b> Name:  </b></td><td>:</td><td>".$php_name."</td></tr>";

				 $message .= "<tr><td align='left'><b> Phone:  </b></td><td>:</td><td>".$php_phone."</td></tr>";
				 
				 $message .= "<tr><td align='left'><b>Email: </b></td><td>:</td><td>".$php_email."</td></tr>";
				 
                 $message .= "<tr><td align='left'><b>Address: </b></td><td>:</td><td>".$php_address."</td></tr>";
				 				 				 
				 $message .= "<tr><td align='left'><b>Message: </b></td><td>:</td><td>".$php_message."</td></tr>";				
				
				$message .="</table></body></html>";
				
				
 				/*to avoid spam mails in contact form*/
				// Select if you want to check form for standard spam text
  				$SpamCheck = "Y"; // Y or N
  				$SpamReplaceText = "*content removed*";
				// Error message prited if spam form attack found
				$SpamErrorMessage = "<p align=\"center\"><font color=\"red\">Malicious code content detected.
									</font><br><b>Your IP Number of <b>".getenv("REMOTE_ADDR")."</b> has been logged.</b></p>";

			if ($SpamCheck == "Y") {		   
				// Check for Website URL's in the form input boxes as if we block website URLs from the form,
				// then this will stop the spammers wastignt ime sending emails
				if (preg_match("/http/i", "$php_name")) {echo "$SpamErrorMessage"; exit();} 
				if (preg_match("/http/i", "$php_phone")) {echo "$SpamErrorMessage"; exit();} 
				if (preg_match("/http/i", "$php_email")) {echo "$SpamErrorMessage"; exit();} 
				if (preg_match("/http/i", "$php_address")) {echo "$SpamErrorMessage"; exit();} 
				if (preg_match("/http/i", "$php_message")) {echo "$SpamErrorMessage"; exit();} 

				// Patterm match search to strip out the invalid charcaters, this prevents the mail injection spammer 
				$pattern = '/(;|\||`|>|<|&|^|"|'."\n|\r|'".'|{|}|[|]|\)|\()/i'; // build the pattern match string 
	                            
  				$php_name = preg_replace($pattern, "", $php_name); 
  				$php_phone = preg_replace($pattern, "", $php_phone); 
			  	$php_address = preg_replace($pattern, "", $php_address); 
			  	$php_email = preg_replace($pattern, "", $php_email); 
  				$php_message = preg_replace($pattern, "", $php_message); 

				// Check for the injected headers from the spammer attempt 
				// This will replace the injection attempt text with the string you have set in the above config section
	  			$find = array("/bcc\:/i","/Content\-Type\:/i","/cc\:/i","/to\:/i"); 
  				$php_email = preg_replace($find, "$SpamReplaceText", $php_email); 
  				$php_name = preg_replace($find, "$SpamReplaceText", $php_name); 
  				$php_phone = preg_replace($find, "$SpamReplaceText", $php_phone); 
  				$php_address = preg_replace($find, "$SpamReplaceText", $php_address); 
  				$php_message = preg_replace($find, "$SpamReplaceText", $php_message); 
  
				// Check to see if the fields contain any content we want to ban
 				if(stristr($php_name, $SpamReplaceText) !== FALSE) {echo "$SpamErrorMessage"; exit();} 
 				if(stristr($php_message, $SpamReplaceText) !== FALSE) {echo "$SpamErrorMessage"; exit();} 
 
 				// Do a check on the send email and subject text
				 if(stristr($to, $SpamReplaceText) !== FALSE) {echo "$SpamErrorMessage"; exit();} 
				 if(stristr($subject, $SpamReplaceText) !== FALSE) {echo "$SpamErrorMessage"; exit();} 
			}
			
			
			
			
				/*End*/
 	
                 $headers = "From: $php_email"."\r\n";

                  $headers .= 'Bcc: roessli.pinto@gmail.com'."\r\n";

                    $headers .='Content-type: text/html; charset=iso-8859-1; format=flowed\n';

                    $headers .="MIME-Version: 1.0\n";

                    $headers .="Content-Transfer-Encoding: 8bit\n";

                    $headers .="X-Mailer: PHP\n";			

				mail($to, $subject, $message, $headers);
				echo "";

?>