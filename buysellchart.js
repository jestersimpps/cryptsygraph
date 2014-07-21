//buysellchart
	
        $(function ()
        {
            $(document).ready(function ()
            {
                Highcharts.setOptions(
                {
                    global:
                    {
                        useUTC: false
                    }
                });
                $('#buysellchart').highcharts(
                {
                    chart:
                    {
                        type: 'spline',
                        animation: Highcharts.svg, // don't animate in old IE
                        marginRight: 10,
                        events:
                        {
                            load: function ()
                            {
                                // set up the updating of the chart each second
                                var currentbuycurve = this.series[0];
                                var currentsellcurve = this.series[1];
                                var legend0 = this.legend.allItems[0];
                                var legend1 = this.legend.allItems[1];
                                var yA = this.yAxis[0];
				
				//every 10 seconds    
                                setInterval(function ()
                                {
                                    x = (new Date()).getTime(); // current time
                                    $.getJSON("currentprices.php?marketid=" + marketid, function (data)
                                    {
                                        currentbuyprice = parseFloat(data.buyprice);
                                        currentsellprice = parseFloat(data.sellprice);
					
					document.getElementById("buyprice").innerHTML = "<span><font color=\"red\">Buy Price: " + currentbuyprice + "</font></span>";					
					document.getElementById("sellprice").innerHTML = "<span><font color=\"lime\">Sell Price: " + currentsellprice + "</font></span>";	
					
                                        currentbuyorders = parseFloat(data.buyorders);
                                        currentsellorders = parseFloat(data.sellorders);
                                        currentbuycurve.addPoint([x, currentbuyprice], true, true);
                                        currentsellcurve.addPoint([x, currentsellprice], true, true);
                                        //update legend with latest prices
                                        legend0.update(
                                        {
                                            name: 'Buy price: ' + currentbuyprice
                                        });
                                        legend1.update(
                                        {
                                            name: 'Sell price: ' + currentsellprice
                                        });
                                        //presetlines
                                        yA.removePlotLine('presetbuyline');
                                        yA.addPlotLine(
                                        {
                                            id: 'presetbuyline',
                                            value: currentbuyprice - 0.03 * currentbuyprice,
                                            width: 3,
                                            color: '#800000'
                                        });
                                        yA.removePlotLine('presetsellline');
                                        yA.addPlotLine(
                                        {
                                            id: 'presetsellline',
                                            value: currentsellprice + 0.03 * currentsellprice,
                                            width: 3,
                                            color: '#008000'
                                        });
                                    });
                                }, 10000);
                            }
                        }
                    },
                    title:
                    {
                        text: 'Price'
                    },
                    xAxis:
                    {
                        type: 'datetime',
                        tickPixelInterval: 150
                    },
                    yAxis:
                    {
                        title:
                        {
                            text: 'Price'
                        },
                        labels:
                        {
                            format: '{value:.8f}'
                        },
                        plotLines: [
                            {
                                id: 'presetbuyline',
                                value: 0,
                                width: 3,
                                color: '#800000'
                        },
                            {
                                id: 'presetsellline',
                                value: 0,
                                width: 3,
                                color: '#008000'
                        }]
                    },
		    credits:
		    {
			enabled: false
		    },	    
		    plotOptions:
		    {
			spline:
			{
			    marker:
			    {
				enabled: false,
				symbol: 'Circle',
				radius: 0,
				states:
				{
				    hover:
				    {
					enabled: true
				    }
				}
			    }
			}
		    },
                    tooltip:
                    {
                        formatter: function ()
                        {
                            return 'Current ' + this.series.name + '<br>Time: <b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '</b><br>Price: <b>' + this.y;
                        }
                    },
                    legend:
                    {
                        enabled: true
                    },
                    exporting:
                    {
                        enabled: false
                    },
                    series: [
                        {
                            name: 'Buy price',
                            color: '#FF0000',
                            data: (
                                function ()
                                {
                                    var data = [],
                                        time = (new Date()).getTime(),
                                        i;
                                    for (i = -100; i <= 0; i++)
                                    {
                                        data.push(
                                        {
                                            x: time + i * 10000,
                                            y: null
                                        });
                                    }
                                    return data;
                                })()
                    },
                        {
                            name: 'Sell price',
                            color: '#00FF00',
                            data: (
                                function ()
                                {
					
                                    var data = [],
                                        time = (new Date()).getTime(),
                                        i;
                                    for (i = -100; i <= 0; i++)
                                    {
                                        data.push(
                                        {
                                            x: time + i * 10000,
                                            y: null
                                        });
                                    }
                                    return data;
                                })()
                    }]
                });
            });
        });

