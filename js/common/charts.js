function renderEchartsPie(data, el) {
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        title: {
            left: "center",
            top: "5%",
            text: " 伤口测量结果分析图",
            textStyle: {
                fontSize: "14"
            }
        },
        color: ['red', 'yellow', 'black', '#c0c0c0', 'pink'],
        legend: {
            orient: 'horizontal',
            bottom: '0',
            data: ['red', 'yellow', 'black', 'white', 'pink'],
            formatter: function (name) {
                var oa = option.series[0].data;
                var num = oa[0].value + oa[1].value + oa[2].value + oa[3].value;
                for (var i = 0; i < option.series[0].data.length; i++) {
                    if (name == oa[i].name) {
                        return name + ": " + oa[i].value + '%';
                    }
                }
            }
        },
        series: [
            {
                name: ' 伤口测量结果分析',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: data,
                labelLine: {
                    show: false
                },
                label: {
                    show: false
                }

            }
        ]
    };

    el.setOption(option)
}
function renderEchartsLine(data, el) {
    var seriesOtherOption = {
        type: 'line',
        label: {
            normal: {
                show: true,
            }
        },
        markLine: {
            symbol: 'none',
            lineStyle: {
                normal: {
                    type: 'dashed',
                    colr: "#c0c0c0"
                }
            },
            label: {
                show: false
            },
            data: [

                { yAxis: 1320, name: '7' },
                { xAxis: "Mon", name: 'Mon' },


            ]
        },
        areaStyle: {
            color: "yellow"
        }
    }
    function renderSeries(data) {
        var series = [];
        
        $.each(data.series, function (i, item) {
            var ob = {}
            for (key in seriesOtherOption) {
                ob[key] = seriesOtherOption[key]
            }
            ob.name = item.name;
            ob.data = item.data;
            series.push(ob)
        })
        return series
    }


    var option = {
        color: ['#8fc31f', '#f35833', '#00ccff', '#ffcc00'],
        title: {
            left: "center",
            top: "5%",
            text: " 伤口愈合曲线",
            textStyle: {
                fontSize: "14"
            }
        },
        xAxis: {
            type: 'category',
            data: data.xAxis,

        },
        yAxis: {
            type: 'value'
        },
        grid: {
            top: "18%",
            buttom: "52%"
        },
        legend: {
            data: ['width', 'length', 'area', 'deep'],
            selectedMode: 'single',
            orient: 'horizontal',
            bottom: '0',

            icon: "rect"
        },
        series: renderSeries(data)
    };

    el.setOption(option)
}