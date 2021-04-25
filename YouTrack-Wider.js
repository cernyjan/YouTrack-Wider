$( document ).ready(function() {
    console.log("YouTrack Wider is Online");
	

	let lastUrl = location.href; 
	var timer = setInterval(ytTimer, 100);
	var isTimerRunning = true;
	var timeout = 100;
	var loop = 1;


	new MutationObserver(() => {
		const url = location.href;
		if (url !== lastUrl) {
			lastUrl = url;
			onUrlChange();
		}
	}).observe(document, {subtree: true, childList: true});
		

	function onUrlChange() {
		if (isTimerRunning) {
			clearInterval(timer);
			isTimerRunning = false;
			console.log("YouTrack Wider is Offline");
		}
		console.log("YouTrack Wider is Online");
		loop = 1;
		timer = setInterval(ytTimer, 100);
		isTimerRunning = true;		
	}	


	function GetDetailOldElement() {
		var ytIssueViewElements = document.getElementsByTagName("yt-issue-view");
		if (ytIssueViewElements.length) {
			return ytIssueViewElements[0];
		}
		else {
			return null;
		}
	}


	function GetDetailLiteElement() {
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


	function GetNewOldElement() {
		var ytIssueViewElements = document.getElementsByClassName("yt-issue-full__container");
		if (ytIssueViewElements.length) {
			return ytIssueViewElements[0];
		}
		else {
			return null;
		}
	}


	function GetNewLiteElement() {
		var divTags = document.getElementsByTagName("div");
		for (var i = 0; i < divTags.length; i++) {
			if (divTags[i].className.indexOf('main_') >= 0) {
				return divTags[i];
			}
		}
		return null; 
	}


	function GetListOldElement() {
		var ytIssueViewElements = document.getElementsByClassName("issues__container");
		if (ytIssueViewElements.length) {
			return ytIssueViewElements[0];
		}
		else {
			return null;
		}
	}


	function TryMakeWider() {
		var pathname = window.location.pathname;
		if (pathname.indexOf('/newIssue') >= 0 ) {
			var newOldElement = GetNewOldElement();
			var newLiteElement = GetNewLiteElement();
			if (newOldElement != null || newLiteElement != null) {
				if (newOldElement != null) {
					newOldElement.style.maxWidth = '100%';
				}
				else {
					newLiteElement.style.width = '100%';
				}
				clearInterval(timer);
				isTimerRunning = false;
				console.log("YouTrack Wider is Offline - made wider");
				return;
			}
		}
		else if (pathname.indexOf('/issues') >= 0) {
			var listOldElement = GetListOldElement();
			if (listOldElement != null) {
				listOldElement.style.maxWidth = '100%';
				clearInterval(timer);
				isTimerRunning = false;
				console.log("YouTrack Wider is Offline - made wider");
				return;
			}
		}		
		else if (pathname.indexOf('/issue') >= 0) {
			var detailOldElement = GetDetailOldElement();
			var detailLiteElement = GetDetailLiteElement();
			if (detailOldElement != null || detailLiteElement != null) {
				if (detailOldElement != null) {
					detailOldElement.style.maxWidth = '100%';
				}
				else {
					detailLiteElement.style.width = '100%';
				}
				clearInterval(timer);
				isTimerRunning = false;
				console.log("YouTrack Wider is Offline - made wider");
				return;
			}
		}	
		else {
			//go to next iteration
		}
	}


	function ytTimer() {
		if (loop < timeout)
		{
			TryMakeWider();
		}
		else {
			clearInterval(timer);
			isTimerRunning = false;
			console.log("YouTrack Wider is Offline - cannot make wider");
		}

		loop = loop + 1;
	}	
});