$( document ).ready(function() {
    console.log("YouTrack Wider is Online");
	
	var mode = '';
	var timeout = 100;
	var loop = 0;

	var timer = setInterval(ytTimer, 100);

	function GetOldElement() {
		var ytIssueViewElements = document.getElementsByTagName("yt-issue-view");
		if (ytIssueViewElements.length) {
			return ytIssueViewElements[0];
		}
		else {
			return null;
		}
	}

	function GetLiteElement() {
		var divTags = document.getElementsByTagName("div");
		for (var i = 0; i < divTags.length; i++) {
			if (divTags[i].hasAttribute('data-test')) {
				if (divTags[i].getAttribute('data-test').indexOf('issue-container') > -1) {
					return divTags[i];
				}
			}
		}
		return null; 
	}

	function MakeWider() {
		if (mode.indexOf('Lite') >= 0 ) {
			GetLiteElement().style.width = '100%';
		}	
		else if (mode.indexOf('Old') >= 0) {
			GetOldElement().style.maxWidth = '100%';
		}
		else {
			console.log("Unexpected mode: '", mode, "'");
		}
		clearInterval(timer);
	}

	function IsWiderable() {
		var oldElement = GetOldElement();
		var liteElement = GetLiteElement();
		if (oldElement != null || liteElement != null) {
			if (oldElement != null) {
				mode = 'Old';
			}
			else {
				mode = 'Lite';
			}
			return true;
		}
		else {
			return false;
		}  		
	}

	function ytTimer() {
		if (loop < timeout)
		{
			if(IsWiderable()) {
				MakeWider();
			}
		}
		else {
			clearInterval(timer);
			console.log("Cannot make wider");
		}

		loop = loop + 1;
	}	
});