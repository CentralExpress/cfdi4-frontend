<template>
    <v-container>
        <v-card>
            <div id="mytext">This is some text that needs to be copied</div>
        <button @click="copyText">Copy</button>
        </v-card>
        
    </v-container>
</template>

<script>
    export default { 
        data () { 
            return {
                message:'Mensaje',
            }
        },
        methods: {
            //If you want to copyText from Element
            copyTextFromElement(elementID) {
                let element = document.getElementById(elementID); //select the element
                let elementText = element.textContent; //get the text content from the element
                this.copyText(elementText); //use the copyText function below
            },

            //If you only want to put some Text in the Clipboard just use this function
            // and pass the string to copied as the argument.
            copyText() {
               navigator.clipboard.writeText(this.message)
               .then(() => {
                    alert("successfully copied");
                })
                .catch(() => {
                    alert("something went wrong");
                });
            }
        }
    }
</script>