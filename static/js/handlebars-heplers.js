Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
	if (arguments.length < 3)
		throw new Error("Handlebars Helper equal needs 2 parameters");
	if( lvalue!=rvalue ) {
		return options.inverse(this);
	} else {
		return options.fn(this);
	}
});

Handlebars.registerHelper('moment', function (context) {
	return moment(context.hash.from).fromNow();
});

Handlebars.registerHelper('formatCommDelimiter', function (context) {
    Number.prototype.formatNumber = function(c, d, t){
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    return parseInt(context).formatNumber(0, '.', ',');
});

Handlebars.registerHelper('firstСharacter', function (context) {
    return (context.toString()[0] != undefined) ? context.toString()[0].toUpperCase() : "N";
});

var colorIndex = 0;
Handlebars.registerHelper('randomBackgroundColor', function () {
    //var max = 255;
    //var min = 0;
    //var red = Math.floor(Math.random() * (max - min + 1)) + min;
    //var green = Math.floor(Math.random() * (max - min + 1)) + min;
    //var blue = Math.floor(Math.random() * (max - min + 1)) + min;
    //return "background-color: rgb("+red+","+green+","+blue+");";

    //var colors = ["#f4c319", "#e14c4d", "#5fcf98", "#f48819", "#5ea9f7", "#f48819", "#5fcfce", "rgb(227,42,190)", "rgb(44,101,231)", "rgb(200,48,205)"];
    // https://www.google.com/design/spec/style/color.html#color-color-palette - 300

    //console.log("testIndex", colorIndex);

    function shuffle(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    var colors300 = [
        "#E57373",
        "#F06292",
        "#BA68C8",
        "#9575CD",
        "#7986CB",
        "#64B5F6",
        "#4FC3F7",
        "#4DD0E1",
        "#4DB6AC",
        "#81C784",
        "#AED581",
        "#DCE775",
        "#FFF176",
        "#FFD54F",
        "#FFB74D",
        "#FF8A65",
        "#A1887F",
        "#E0E0E0",
        "#90A4AE",

        "#E57373",
        "#F06292",
        "#BA68C8",
        "#9575CD",
        "#7986CB",
        "#64B5F6",
        "#4FC3F7",
        "#4DD0E1",
        "#4DB6AC",
        "#81C784",
        "#AED581",
        "#DCE775",
        "#FFF176",
        "#FFD54F",
        "#FFB74D",
        "#FF8A65",
        "#A1887F",
        "#E0E0E0",
        "#90A4AE"
    ];
    shuffle(colors300);

    //var index = Math.floor(Math.random() * (colors300.length));

    var index = Math.floor(colorIndex % colors300.length);
    colorIndex++;

    return "background-color: "+colors300[index]+";";
});

Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 == v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});
Handlebars.registerHelper('ifNotCond', function(v1, v2, options) {
    if(v1 != v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});


//Handlebars.registerHelper('format-date', function (value) {
//	console.log(value);
//	//return moment(context.hash.from).format();
//	//return 'Testing: ' + this.get('clock.second');
//}, 'clock.second');
