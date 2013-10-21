var calender = {
    /*计算一下下几天是哪天*/
    _nextDay : function(date,add_days){
	var dt = date;
	dt.setDate(dt.getDate() + add_days);
	return dt;
    },
    _isToday : function(date){
	var new_dt = new Date();
	if(new_dt === date){
	    return true;
	}else{
	  return false;
	}
    },
    _nextMonth:function(date,add_months){
      var dt = date;
      dt.setMonth(dt.getMonth() + add_months);
      return dt;
    },
    _nextYear : function(date,add_years){
      var dt = date;
      dt.setYear(dt.getYear() + add_years);
      return dt;
    }
};

/*得到日历上的第几天在是当月(或者上月下月)的日数*/
var DayLocation = function(year,month,location){

  var return_data = {
      date:0,
      type:0 //表示日子的类型.-1表示上个月,1表示下个月.
  };
  /*当月第一天*/
  var first_date = new Date(year,month-1,1);
  var first_day  = first_date.getDay()?first_date.getDay():7;
  var cal_day = calender._nextDay(first_date,location-first_day);
  return_data.date = cal_day.getDate();
  if(location < first_day){
    return_data.type = -1;
    return return_data;
  }else{
    if(cal_day.getMonth() != month -1){
      return_data.type = 1;
      return return_data;
    }else{
      return_data.type = 0;
      return return_data;
    }
  }
};

var init_head  = function(obj,year,month){
  var model_head  = $("<div class='nav'><div class='nav-prev'></div><div class='nav-title'></div><div class='nav-next'></div></div>");
  obj.append(model_head);
}

var init_table = function(obj,year,month){
  var date = new Date();
  var reg_num = /[0-9]+/;
  var opt = {
      height : obj.height(),
      width  : obj.width()
  };
  var td_class = {
      "-1":"prev",
      "0":"current",
      "1":"next"
  };

  var model_body  = $("<table></table>");
  var model_tr = $("<tr></tr>");
  var model_td = $("<td></td>");

  model_body.attr({
    height : reg_num.exec(opt.height) * 0.8 + "px",
    width  : opt.width
  });
  obj.append(model_body);

  obj.find(".nav-prev").html("<");
  obj.find(".nav-next").html(">");

  obj.find(".nav-title").html(year+" - "+month);
  obj.find(".nav").css("width",opt.width);

  /*raw*/
  for(var r=0;r<6;r++){
    /*将可能多出的第6行中止掉*/

    if(DayLocation(year,month,r*7+1).type == 1){
      break;
    }

    model_body.append("<tr class=body_"+r+"></tr>");

    for(var c=0;c<7;c++){
      var day_loc = DayLocation(year,month,r*7+c+1);
      obj.find(".body_"+r).append("<td class='"+td_class[day_loc.type]+" td_"+r+"_"+c+"'></td>");
      obj.find(".td_"+r+"_"+c).html(day_loc.date);
    }
  }
};

var CalenderAnimate = function(obj){
  var dt = new Date();
  init_head(obj,dt.getFullYear(),dt.getMonth()+1);
  init_table(obj,dt.getFullYear(),dt.getMonth()+1);

  /*向后的按钮*/
  obj.find("div.nav-prev").click(function(){
    var dtt = calender._nextMonth(dt,-1);
    obj.find("table").remove();
    init_table(obj,dtt.getFullYear(),dtt.getMonth()+1);
  });

/*向前的按钮*/
obj.find("div.nav-next").click(function(){
  var dtt = calender._nextMonth(dt,1);
  obj.find("table").remove();
  init_table(obj,dtt.getFullYear(),dtt.getMonth()+1);
});
}

$(document).ready(function(){
  CalenderAnimate($(".calender"));
});
