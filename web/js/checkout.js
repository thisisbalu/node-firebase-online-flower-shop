
// ====================Validation each fields in the form========================


var inputs = document.querySelectorAll("input");
console.log(inputs);

var pattern = {
	
card_number:/^[0-9]{15,16}$/,            //only numbers can be entered, at least 15 simbol and 16 max simbol
cvc:/^[0-9]{3,3}$/,                      //only three-digit numbers can be entered
card_name:/^[A-Z]{3,15}\s[A-Z]{3,15}$/,  // uppercase only First name and Last name separated by space. Every name must be contain at least 3 to 15 letters
expiration:/^([\d]{2,2}\/[\d]{2,2})$/,  // Must contain only 4 digits. 2 digist and 2 digist separated by a slash. Exm: 22/22
name:/^[A-Z]{1,1}[a-z]{2,14}\s[A-Z]{1,1}[a-z]{2,14}$/, //name must be contain full name (First name+Last name).First letter in uppercase subsequent letter in lowcase. First name and last name separated by space.  
city:/^[A-Z]{1,1}[a-z A-Z]+$/,
postalcode:/^[A-Z]{1,1}[0-9]{1,1}[A-Z]{1,1}[0-9]{1,1}[A-Z]{1,1}[0-9]{1,1}$/,/* Every postale code must be contain: uppercase later, digital, uppercase later, digital, uppercase later, digital */ 
province:/^[A-Z]{1,1}[a-z A-Z]+$/
}

function validate(field, regex){

if(regex.test(field.value)){

field.className = "valid";
}else{
field.className = "invalid";
}

}
// document.querySelector("form").addEventListener("submit", function (e) {
// 	if (!validate()) {
// 			e.preventDefault();
// 	}
// });

inputs.forEach((input)=>{
input.addEventListener("keyup",(e)=>{

	validate(e.target, pattern[e.target.attributes.name.value]);
})
})

// ==========================function for button Continue=======================

//checkbox_form=document.querySelector('#chek_card');

 function buttonClicked(e){
																																																		
			 
 		if (document.getElementById("firstName").value!=""
 				&& document.getElementById("lastName").value!=""		
 				&&document.getElementById("card_number").value!="" 
 				&& document.getElementById("cvc").value!=""
 				&& document.getElementById("card_name").value!=""
 				&& document.getElementById("cc-expiration").value!=""
 				&& document.getElementById("name").value!=""
 				&& document.getElementById("address").value!=""
 				&& document.getElementById("country").value!=""
 				&& document.getElementById("postalcode").value!=""
 				&& document.getElementById("province").value!=""
 				&& document.getElementById("myCheck").checked)
 		{   
 				alert("Thank you for your shopping!");
 				//window.location = "./index.html"; 
								
 		}
 		else { 
				
 				//alert("Please note that all nonoptional fields are required !!! ");
				
 		} 


 }

