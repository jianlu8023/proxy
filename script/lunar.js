const res = {};
const date = [];
const isQuantumultX = typeof $task !== "undefined";
const isSurge = typeof $httpClient !== "undefined";
const isLoon = typeof $loon !== "undefined";
var temp = ( function () {
    'use strict';
    var lunarInfo = [ 0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
        0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
        0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
        0x0d520 ];

    var nStr1 = [ "\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341" ];
    var nStr2 = [ "\u521D", "\u5341", "\u5EFF", "\u5345" ];
    var nStr3 = [ "\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A" ];

    var calendar = {
        lunarInfo: lunarInfo, nStr1: nStr1, nStr2: nStr2, nStr3: nStr3,
        lYearDays: function lYearDays( y ) {
            var i, sum = 348;
            for ( i = 0x8000; i > 0x8; i >>= 1 ) {
                sum += this.lunarInfo[ y - 1900 ] & i ? 1 : 0;
            }
            return sum + this.leapDays( y );
        },
        leapMonth: function leapMonth( y ) {
            return this.lunarInfo[ y - 1900 ] & 0xf;
        },
        leapDays: function leapDays( y ) {
            if ( this.leapMonth( y ) ) {
                return this.lunarInfo[ y - 1900 ] & 0x10000 ? 30 : 29;
            }
            return 0;
        },
        monthDays: function monthDays( y, m ) {
            if ( m > 12 || m < 1 ) {
                return -1;
            }
            return this.lunarInfo[ y - 1900 ] & 0x10000 >> m ? 30 : 29;
        },
        toChinaMonth: function toChinaMonth( m ) {
            if ( m > 12 || m < 1 ) {
                return -1;
            }
            var s = this.nStr3[ m - 1 ];
            s += "\u6708";
            return s;
        },
        toChinaDay: function toChinaDay( d ) {
            var s;
            switch ( d ) {
                case 10:
                    s = "\u521D\u5341";
                    break;
                case 20:
                    s = "\u4E8C\u5341";
                    break;
                case 30:
                    s = "\u4E09\u5341";
                    break;
                default:
                    s = this.nStr2[ Math.floor( d / 10 ) ];
                    s += this.nStr1[ d % 10 ];
            }
            return s;
        },
        nextDay: function getNextDay() {
            var date = new Date();
            // +1 可以换为其他前后天数
            date.setDate( date.getDate() + 1 );
            return date

        },
        solar2lunar: function solar2lunar() {
            var objDate = this.nextDay();
            //var objDate=new Date(2023,7,16)
            var i, leap = 0, temp = 0;
            var y = objDate.getFullYear();
            var m = objDate.getMonth() + 1;
            var d = objDate.getDate();
            var offset = ( Date.UTC( objDate.getFullYear(), objDate.getMonth(), objDate.getDate() ) - Date.UTC( 1900, 0, 31 ) ) / 86400000;
            for ( i = 1900; i < 2101 && offset > 0; i++ ) {
                temp = this.lYearDays( i );
                offset -= temp;
            }
            if ( offset < 0 ) {
                offset += temp;
                i--;
            }
            var year = i;
            leap = this.leapMonth( i );
            var isLeap = false;
            for ( i = 1; i < 13 && offset > 0; i++ ) {
                if ( leap > 0 && i === leap + 1 && isLeap === false ) {
                    --i;
                    isLeap = true;
                    temp = this.leapDays( year );
                } else {
                    temp = this.monthDays( year, i );
                }
                if ( isLeap === true && i === leap + 1 ) {
                    isLeap = false;
                }
                offset -= temp;
            }
            if ( offset === 0 && leap > 0 && i === leap + 1 ) {
                if ( isLeap ) {
                    isLeap = false;
                } else {
                    isLeap = true;
                    --i;
                }
            }
            if ( offset < 0 ) {
                offset += temp;
                --i;
            }
            var month = i;
            var day = offset + 1;
            var solarDate = y + '-' + m + '-' + d;
            var lunarDate = ( isLeap ? "\u95F0" : '' ) + this.toChinaMonth( month ) + this.toChinaDay( day );

            if ( ( "初一" === this.toChinaDay( day ) ) || ( "十五" === this.toChinaDay( day ) ) ) {
                return {
                    flag: true,
                    date: solarDate,
                    lunarDate: lunarDate,
                };
            }
            return {
                flag: false,
                date: solarDate,
                lunarDate:lunarDate,
            };
        },
    };
    return calendar;
}
)().solar2lunar();
if (isQuantumultX) {
    $notify("明日农历"+temp["lunarDate"]);
  } else if (isSurge || isLoon) {
    $notification.post( "明日农历"+temp["lunarDate"]);
  }
  $done();




if (true== temp["flag"]){
    
    
    
    
    
    if (typeof $notification !== "undefined") {
          $notification.post("明日农历"+temp["lunarDate"]);
    } else if (typeof $notify !== "undefined") {
        $notify("明日农历"+temp["lunarDate"]);
    }
}
$done();

//if (true== temp["flag"]){
//$notify("明天农历 "+temp["lunarDate"])
//}
//$done();
