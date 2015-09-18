
(function ($) {

	var Notice = $('<div class="wd-notice col-md-4 col-md-offset-8 col-sm-6 col-sm-offset-6 col-xs-12">'
        +'<div class="alert alert-dismissable alert-info shadow-z-2">'
        +'<button type="button notice-close" class="close" data-dismiss="alert">×</button>'
        +'<strong class="wd-notice-title">{{title}}</strong><p class="wd-notice-body">{{body}}</p></div></div>')

    var nest=null;
    var read =null;
    var makeNest=function(el){
        el.addClass("container").css("position","fixed").css("right","0px").css("top","25%");
    }
	var showNotice=function(el,id,title,content){
        var notice=Notice.clone()
        
        notice.find("button.close").click(function(){
            notice.remove();
            read.push(id); 
            localStorage.setItem('wildNotice:read',JSON.stringify(read));     
        })
        notice.find(".wd-notice-title").text(title);
        notice.find(".wd-notice-body").html(content);
        el.prepend(notice);
	}
    
	$.fn.wildNotice = function (repo) {
        var self=this;
        makeNest(this)
        read = localStorage.getItem('wildNotice:read')
        if(read!=null){
            try{
                read=JSON.parse(read);
                if(!(read instanceof Array))
                    read=[];
            }
            catch(e){
                read=[]
            }
            
        }else{
            read=[]
        }
        var onchange=function(snap){
            var val=snap.val();
            var key=snap.key();
            if(key==null||val==null||val.title==null||val.content==null){
                return;
            }
            if($.inArray(key, read)<0){
                //show     
                showNotice(self,key,val["title"],val["content"]); 
            }
            else{
        //ignore
            }
        }
        var ref = new Wilddog(repo);

        ref.limitToLast(5).on('child_added',onchange);
        ref.limitToLast(5).on('child_changed',onchange);
    };
})(jQuery);