var chart = c3.generate({
                bindto: '#Q3bar',
                color: {
                    pattern: ['#FABF62', '#ACB6DD']
                },
                data: {
                    x: 'x',
                    columns:
                        [
                      ['x', 'Finland','Denmark','Norway','Iceland','New Zealand','South Sudan','Ivory Coast','Rwanda','Togo','Syria',
],
                      ['value', 7.662303925,
7.546741009,
7.434960842,
7.426853657,
7.286391258,
3.924532413,
3.908273458,
3.898634672,
3.569603682,
3.516278267]
                      ],

                    type: 'bar',

                    color: function(inColor, data) {
                                          var colors = ['#ff4d4d','#ff6666','#ff8080','#ff9999','#ffb3b3','#ffb366','#ffbf80','#ffcc99','#ffd9b3','#ffe6cc'	];
                                          if(data.index !== undefined) {
                                              return colors[data.index];
                                          }

                                          return inColor;
                                      }
                },
                axis: {
                    rotated: true,
                    x: {
                        type: 'category'
                    }
                },
                tooltip: {
                    grouped: false
                },
                legend: {
                    show: false
                }
            });
