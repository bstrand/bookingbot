chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "fire") {
            packageAndRequest(request.amount, request.requestData);
        }
    });

function packageAndRequest(amount, requestData) {
    var success = false;
    for (var i = 0; i < amount; i++) {
        if (!success) {
            setTimeout(function() {
                if (!success) {
                    var request = new XMLHttpRequest();
                    console.log("Sending request #"+i);
                    request.open("HEAD", "http://www.reserveamerica.com/switchBookingAction.do" + requestData, true);
                    request.onload = function() {
                        if (this.responseURL.indexOf("reservationDetails") > -1) {
                            chrome.tabs.create({url: 'https://www.reserveamerica.com/viewShoppingCart.do'});
                            success = true;
                        }
                    };
                    request.send();
                }
            }, parseInt(i / 20) * 1000);
        }
    }
}

// function requestComplete() {
//     if (this.responseURL.indexOf("reservationDetails") > -1) {
//         alert("Frack! Check your cart!");
//     }
// }
