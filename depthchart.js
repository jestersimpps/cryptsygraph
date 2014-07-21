//depthchart	
$(function ()
{
    $('#depthchart').highcharts(
    {
        colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        chart:
        {
            type: 'area',
            animation: false, // don't animate in old IE
            marginRight: 10,
            backgroundColor: '#000000',
            borderWidth: 0,
            plotBackgroundColor: '#000000',
            plotShadow: true,
            plotBorderWidth: 0,

            events:
            {
                load: function ()
                {
                    // set up the updating of the chart each second
                    var buydepth = this.series[0];
                    var selldepth = this.series[1];
                    var legend0 = this.legend.allItems[0];
                    var legend1 = this.legend.allItems[1];
                    var depthchart = $('#depthchart').highcharts();
                    setInterval(function ()
                    {
                        $.getJSON("depthdata.php?marketid=" + marketid, function (data)
                        {
                            for (var i = 0, len = depthchart.series.length; i < len; i++)
                            {
                                depthchart.series[0].remove();
                            }
                            //options.series = series
                            depthchart.addSeries(
                            {
                                name: 'Buy depth',
                                color: '#00FF00',
                                data: data.buydepth
                            }, false);
                            depthchart.addSeries(
                            {
                                name: 'Sell depth',
                                color: '#FF0000',
                                data: data.selldepth
                            }, false);
                            depthchart.redraw();
                            //update legend with latest prices
                            legend0.update(
                            {
                                name: 'Buy depth: ' + data.buydepth[0][0]
                            });
                            legend1.update(
                            {
                                name: 'Sell depth: ' + data.selldepth[0][0]
                            });
                        });
                    }, 10000);
                }
            }
        },
        title:
        {
            text: 'Market Depth',
            style:
            {
                color: '#ffffff',
                font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        xAxis:
        {
            type: 'linear',
            labels:
            {
                format: '{value:.8f}',
                style:
                {
                    color: '#ffffff',
                    font: '11px Trebuchet MS, Verdana, sans-serif'

                },
                lineColor: '#ffffff',
                tickColor: '#ffffff',
                title:
                {
                    style:
                    {
                        color: '#ffffff',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                    }
                }
            }
        },
        yAxis:
        {
            title:
            {
                text: 'Quantity',
                style:
                {
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'
                }
            },
            labels:
            {
                format: '{value:.0f}',
                style:
                {
                    color: '#ffffff',
                    font: '11px Trebuchet MS, Verdana, sans-serif'
                }
            },
            alternateGridColor: null,
            minorTickInterval: 'auto',
            lineColor: '#ffffff',
            lineWidth: 1,
            tickWidth: 1,
            tickColor: '#ffffff'

        },
         legend: {
            itemStyle: {            
                font: '9pt Trebuchet MS, Verdana, sans-serif',
                color: '#ffffff'
    
            },
            itemHoverStyle: {
                color: '#039'
            },
            itemHiddenStyle: {
                color: 'gray'
            }
        },
        credits:
        {
            enabled: false
        },        
        tooltip:
        {
            formatter: function ()
            {
                return this.series.name + '<br>Price:<b>' + this.x + '</b><br>Order quantity: <b>' + this.y;
            }
        },
        exporting:
        {
            enabled: false
        },
        plotOptions:
        {
            area:
            {
                animation: false,
                //stacking: 'normal',
                marker:
                {
                    enabled: false,
                    symbol: 'Circle',
                    radius: 1,
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
        series: [
            {
                name: 'Buy depth',
                color: '#FF0000',
                data: [0, 0]
                },
            {
                name: 'Sell depth',
                color: '#00FF00',
                data: [0, 0]
                }]
    });
});