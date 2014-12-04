var env = require('jsdom').env,
    fs = require('fs');


var paths = {
    'transcript': './transcript/transcript.html',
    'report': './report/report.html',
    'jquery': "./node_modules/jquery/dist/jquery.js"
}

var html = fs.readFileSync(paths.transcript);

env({
        html: html,
        scripts: [paths.jquery],
        done: function (err, window) {
            if (err) throw err;

            var $ = window.$;

            // get the term tables
            var terms = $('table.displayTag');

            // loop the terms, get the total credits, and weighted scores
            var credits = 0,
                scores = 0;
            console.log('####共 ' + terms.length + '学期');
            terms.each(function(i) {
                if((i+1) < 0) {
                    return;
                }

                console.log('###第 ' + (i+1) + ' 学期');

                var term = this;
                var courses = $('tbody>tr', $(term));
                console.log('##共 ' + courses.length + ' 门课');

                courses.each(function(j) {
                    var course = this;
                    var infos = $('td', $(course));

//                    console.log('#第 ' + (j+1) + ' 门课:' + $(infos.get(2)).text() + ' ' + $(infos.get(4)).text() + '学分' + $(infos.get(6)).text());

                    var credit = parseFloat($(infos.get(4)).text());
                    if ($(infos.get(6)).html().indexOf('免修') == -1) {
                        credits += credit;
                        scores += credit * parseFloat($(infos.get(6)).text());
                    } else {
//                        credits += credit;
//                        scores += credit* 90.0;
                    }
                });
            });

            var weightedScore = scores / credits;

            console.log('$$$ GPA: ' + weightedScore);
            console.log('$$$ Credit: ' + credits);
        }
    });






