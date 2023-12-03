var quote = document.getElementById("quote");
var alertDiv = document.getElementById("alert");
var buttonDiv = document.getElementById("buttonDiv");
var currentQuote, quoteContent;

if(JSON.parse(localStorage.getItem('savedQuotes')) != null){
    buttonDiv.innerHTML = ` 
        <button class="btn btn-success" id="getQuote" onclick="getQuote()">Get Quote</button>  
        <button class="btn btn-info" onclick="retrieveQuote()">View Saved Quotes</button>
    `
}
else{
    buttonDiv.innerHTML = ` 
        <button class="btn btn-success" id="getQuote" onclick="getQuote()">Get Quote</button>
    `;
}

function getQuote(){
    fetch(`https://api.quotable.io/quotes/random`)
        .then(res=>res.json())
        .then((data=>{
            console.log(data)
            quoteContent = `
            <div class="quoteItem p-3 d-flex flex-column justify-content-center align-items-centers-center">
            <hr>
                <p class="quote display-6">${data[0].content}</p>
                <p class="author blockquote-footer text-center pt-3" onclick="getQuoteByAuthor(${data[0].author})">${data[0].author}</p>
                <p class="">`
                for(i=0; i<data[0].tags.length; i++){
                    quoteContent += `
                    <span class="tag p-1 px-2" onclick="getQuoteByTag('${data[0].tags[i]}')">#${data[0].tags[i]}</span>
                    `
                }
                currentQuote = data[0]._id;
                console.log(currentQuote)
                quoteContent += `
                </p>
            </div>
            `
            console.log(data[0].author);
                buttonDiv.innerHTML = `
                    <button class="btn btn-success" id="getQuote" onclick="getQuote()">Get Quote</button>                      
                    <button class="btn btn-info" onclick="retrieveQuote()">View Saved Quotes</button>
                    <button class="btn btn-warning" onclick="saveQuote()">Save This Quote</button>
                `
                quote.innerHTML = quoteContent;
            
        }))
        .catch(err=>{
            console.log(err);
        })
}

function saveQuote(){
    console.log(currentQuote);
    var retrievedQuotes = retrievedQuotes = JSON.parse(localStorage.getItem('savedQuotes'));
    console.log(retrievedQuotes)
    if(retrievedQuotes != null){
        if(!retrievedQuotes.id.includes(currentQuote)){
            retrievedQuotes.id.push(currentQuote);
            localStorage.setItem('savedQuotes', JSON.stringify(retrievedQuotes));
            alert(`Quote Sucessfully Saved to the device. Click on View Saved Quotes to see Saved Quotes`)
        }
        else{
            alert(`Quote Already Saved. Click on View Saved Quotes to see all Saved Quotes`);
        }
    }
    else{
        savedQuotes = {
            id:[currentQuote]
        }
        localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
        console.log(JSON.parse(localStorage.getItem('savedQuotes')));
        alert(`Quote Sucessfully Saved to the device. Click on View Saved Quotes to see Saved Quotes`);
    }
    buttonDiv.innerHTML = `
                    <button class="btn btn-success" id="getQuote" onclick="getQuote()">Get Quote</button>                      
                    <button class="btn btn-info" onclick="retrieveQuote()">View Saved Quotes</button>
                `
}

function retrieveQuote(){
    buttonDiv.innerHTML = `
        <button class="btn btn-success" id="getQuote" onclick="getQuote()">Get Quote</button>
        <button class="btn btn-danger" id="deleteQuote" onclick="deleteQuote()">Delete All</button>
    `
    console.log(JSON.parse(localStorage.getItem('savedQuotes')));
    var retrievedQuotes = JSON.parse(localStorage.getItem('savedQuotes'));
    if(retrievedQuotes == null){
        alert(`It seems like this is your first time visiting here! Save a Quote first to see View them...`);
    }
    else{
        var quoteContent="";
        quote.innerHTML="";
        for(i=0; i<retrievedQuotes.id.length;i++){
            fetch(`https://api.quotable.io/quotes/${retrievedQuotes.id[i]}`)
                .then(res=>res.json())
                .then((data=>{
                    quoteContent = `
                    <div class="quoteItem p-3 d-flex flex-column justify-content-center align-items-center">
                    <hr>
                        <p class="quote display-6">${data.content}</p>
                        <p class="author blockquote-footer text-center pt-3" onclick="getQuoteByAuthor(${data.author})">${data.author}</p>
                        <p class="">`
                        for(i=0; i<data.tags.length; i++){
                            quoteContent += `
                            <span class="tag p-1 px-2" onclick="getQuoteByTag('${data.tags[i]}')">#${data.tags[i]}</span>
                            `
                        }
                    quote.innerHTML += `
                        </p>
                    </div>`    
                    quote.innerHTML += quoteContent;
                }))
        }
    }
}

function getQuoteByAuthor(){

}

function getQuoteByTag(){

}

function deleteQuote(){
    localStorage.clear();
    quote.innerHTML = `
        <p class="text-danger bg-light">All Quotes Deleted Successfully</p>
    `
    buttonDiv.innerHTML = `
        <button class="btn btn-success" id="getQuote" onclick="getQuote()">Get Quote</button>
    `
}