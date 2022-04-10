// ==UserScript==
// @name         Simple Reddit Video Downloader [redditsave.com]
// @version      1.1
// @license      MIT
// @description  Lets you download reddit videos with sound using Redditsave.com
// @icon         https://www.reddit.com/favicon.ico
// @author       NotJ3st3r
// @namespace    https://greasyfork.org/en/scripts/441755-simple-reddit-video-downloader-redditsave-com
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match        https://www.reddit.com/*
// @exclude      https://www.reddit.com/message/compose/*
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    $(function(){
        AddButtons();
        setInterval(AddButtons, 200);
    });

    function AddButtons() {
        //=== post page ===//
        if(window.location.href.includes("/comments/"))
        {
            let vid = $("div[data-test-id='post-content'] video");
            if(vid.length > 0 && !vid.find("source").prop("src").includes("external-preview.redd.it"))
            {
                let bar = $("div[data-test-id=post-content] > div:last");
                //console.log("=======");
                //console.log("bar: " + bar.length);
                //console.log("dlb: " + bar.find(".downloadVid").length);
                if(bar.length > 0 && bar.find(".downloadVid").length == 0) {
                    let saveButt = bar.find("button .icon-save").parent().parent();
                    //console.log("saveb: " + saveButt.length);
                    saveButt.prop("style", "float: left;");
                    saveButt.after(`<div class="outerForDLB"></div>`);
                    bar.find(".outerForDLB").append(saveButt.clone().addClass("downloadVid"));
                    let dlButt = bar.find(".downloadVid");
                    dlButt.find("i.icon").removeClass("icon-save").addClass("icon-downvote");
                    dlButt.find("span:last").html('Download');
                    bar.find(".outerForDLB").prop("style", "float: right;");
                    //console.log("dlb: " + dlButt.length);

                    dlButt.click(function(e){
                        e.preventDefault();
                        let dlUrl = window.location.href.split("#")[0].split("?")[0];
                        window.open("https://redditsave.com/info?url=" + encodeURIComponent(encodeURI(dlUrl)), "_blank");
                    });
                }
            }
        }

        //=== browse page ===//
        let targets = $("div.scrollerItem div > video");
        targets.each(function(){
            if($(this).find("source").length > 0 && !$(this).find("source").prop("src").includes("external-preview.redd.it"))
            {
                let bar = $(this).parent().parent().parent().parent().nextAll("div:last");
                if(bar.find(".icon-save").length == 0)
                    bar = bar.prev().parent().parent().nextAll("div:last");
                if(bar.find(".downloadVid").length == 0)
                {
                    let saveButt = bar.find("button .icon-save").parent().parent();
                    if(saveButt == null) alert("saveButt null!");
                    saveButt.prop("style", "float: left;");
                    saveButt.after(`<div class="outerForDLB"></div>`);
                    bar.find(".outerForDLB").append(saveButt.clone().addClass("downloadVid"));
                    let dlButt = bar.find(".downloadVid");
                    dlButt.find("i.icon").removeClass("icon-save").addClass("icon-downvote");
                    dlButt.find("span:last").html('Download');
                    bar.find(".outerForDLB").prop("style", "float: right;");

                    dlButt.click(function(e){
                        e.preventDefault();
                        let dlUrl = $(this).closest('div[data-click-id="background"]').find("a[data-click-id=body]:first").prop("href").split("#")[0].split("?")[0];
                        window.open("https://redditsave.com/info?url=" + encodeURIComponent(encodeURI(dlUrl)), "_blank");
                    });
                }
            }
        });
    }
})();
