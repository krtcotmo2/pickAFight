console.log("pickFighter");

let charArray = [];
          google.charts.load('current', { 'packages': ['corechart'] });

          $(document).ready(function () {
               let getUrl = "/api/getHeroes";
               $.ajax({
                    url: getUrl,
                    method: "GET"
               }).then(function (response) {
                    let cntr = 1;
                    charArray = response;
                    charArray.forEach(element => {
                         let anOpt = $("<option>");
                         anOpt.val(cntr);
                         anOpt.text(element.alias)
                         cntr++;
                         $("#cboxhero").append(anOpt);
                    });
               });

               $(".col").eq(1).mouseover(function () {
                    $(".player1").removeClass("hidden");
                    if($(".multiple2").hasClass("hidden")){
                         $(".player2").removeClass("hidden");
                    }
               })
               $(".col").eq(1).mouseout(function () {
                    $(".player1").addClass("hidden");
                    if($(".multiple2").hasClass("hidden")){
                         $(".player2").addClass("hidden");
                    }
               })
          });

          $("#cboxhero").on("change", function (evt) {
                if (this.value == "0") {
                    $(".charScreen").addClass("hidden");
                    return;
               }
               let char = charArray.find(o => {
                    return o.alias == $("#cboxhero option:selected").text()
               });
               $(".multiple2").addClass("hidden");
               $(".labName").text(char.name);
               $(".playerImg").attr("src", "");
               $(".playerImg").attr("src", char.img);
               $(".charScreen").removeClass("hidden");
               $(".charScreen2").addClass("hidden");
               $(".dur").html("");
          })

          $("#btnSubmit").on("click", function () {
               let colWidth = $(".col").width();

               let getUrl = `/api/getOpponents/${$("#cboxhero option:selected").text()}&${$(".labName").text()}&${$("#chkFightAny").is(':checked')}`;
               $.ajax({
                    url: getUrl,
                    method: "GET"
               }).then(function (response) {
                    $(".playerImg2").attr("src", "");                    
                    $(".multiple2").html("");
                    $(".multiple2").removeClass("hidden");
                    $(".charScreen2").addClass("hidden");
                    popCharts(response.char, $(".player1"));
                    response.list.forEach(o => {
                         let charHolder = $("<div class='charHolder'>");
                         charHolder.data("char", o.name); 
                         charHolder.append(`<p>${o.alias}</p>`);
                         let parts = Object.keys(o.skill);
                         let openDiv = $("<div class='smallPieHolder'>");
                         parts.forEach((sk, i) => {
                              let charts = drawChart(sk, i, o.skill);
                              openDiv.append(charts)
                         })
                    charHolder.append(openDiv);
                    $(".multiple2").append(charHolder);
                    });

               });
          });

          function drawChart(skill, ind, allSkill) {

               function defaultColors(n) {
               let colores_g = ["#ff0000", "#ffffff"];
                    return colores_g[n % colores_g.length];
               }


               let aDiv = $("<div>");
               aDiv.width(($(".col").width()-80)/7)
               let data;
               if(skill == "gizmos"){
                    data = [
                         { name: "", value: 7 - allSkill[skill] },
                         { name: "", value: allSkill[skill]-1 }
                    ];
               }else{
                    data = [
                         { name: "", value: allSkill[skill] },
                         { name: "", value: 7 - allSkill[skill] }
                    ];
               }

               let width = aDiv.width();
               let height = aDiv.width() + 30;
               let thickness = aDiv.width()*.3;


               let radius = aDiv.width() / 2;
               let color = defaultColors;

               let svg = d3.select(aDiv[0])
                    .append('svg')
                    .attr('class', 'pie')
                    .attr('width', width)
                    .attr('height', height);

               let g = svg.append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + ((height-30) / 2) + ')');

               let arc = d3.arc()
                    .innerRadius(radius - thickness)
                    .outerRadius(radius);

               let pie = d3.pie()
                    .value(function (d) { return d.value; })
                    .sort(null);

               let path = g.selectAll('path')
                    .data(pie(data))
                    .enter()
                    .append("g")
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', (d, i) => color(i))
                    .style("stroke", "#ccc")
                    .each(function (d, i) { this._current = i; });
               aDiv.attr('title', getCatName(skill))
               return aDiv;
          } 

          function getCatName(arg){
               let ret = "";
               switch(arg){
                    case "durability":
                         ret ="Durability"; 
                         break;
                    case "energy":
                         ret ="Energy"; 
                         break;
                    case "fighting":
                         ret ="Combat Skills"; 
                         break;
                    case "intel":
                    ret ="Intelligence"; 
                         break;
                    case "speed":
                    ret ="Speed"; 
                         break;
                    case "strength":
                    ret ="Strength"; 
                         break;
                    case "gizmos":
                    ret ="Gadget Reliance"; 
                         break;
                    default:
                         break;
               }
               return ret;
          }

          function popCharts(player, cont, isOpp = false) {
               let durHlder = $(cont).find(".dur");
               let colWidth = $(".col").width() / 2;
               let options = {
                    title: 'Durability',
                    pieHole: 0.4,
                    pieSliceText: 'none',
                    fontSize: "16",
                    legend: 'none',
                    slices: {
                         0: { color: isOpp ? '#ff0000' : '#3366cc' },
                         1: { color: 'transparent' }
                    },
                    pieSliceBorderColor: "#ccc",
                    width: colWidth,
                    height: 144,
                    'tooltip' : {
                    trigger: 'none'
                    }

               };
               let data = google.visualization.arrayToDataTable([
                    ['', ''],
                    ['', parseInt(player.skill.durability)],
                    ['', 7 - parseInt(player.skill.durability)],
               ]);
               let str = isOpp == true ? "dur2" : "dur1"
               let chart = new google.visualization.PieChart(document.getElementById(str));
               chart.draw(data, options);

               options = {
                    title: 'Energy',
                    fontSize: "16",
                    pieHole: 0.4,
                    pieSliceText: 'none',
                    legend: 'none',
                    slices: {
                         0: { color: isOpp ? '#ff0000' : '#3366cc' },
                         1: { color: 'transparent' }
                    },
                    pieSliceBorderColor: "#ccc", 
                    width: colWidth,
                    height: 144,
                    'tooltip' : {
                    trigger: 'none'
                    }
               }
               data = google.visualization.arrayToDataTable([
                    ['', ''],
                    ['', parseInt(player.skill.energy)],
                    ['', 7 - parseInt(player.skill.energy)],
               ]);
               str = isOpp == true ? "energy2" : "energy1";
               chart = new google.visualization.PieChart(document.getElementById(str));
               chart.draw(data, options);

               options = {
                    title: 'Combat Skills',
                    fontSize: "16",
                    pieHole: 0.4,
                    pieSliceText: 'none',
                    legend: 'none',
                    slices: {
                         0: { color: isOpp ? '#ff0000' : '#3366cc' },
                         1: { color: 'transparent' }
                    },
                    pieSliceBorderColor: "#ccc", 
                    width: colWidth,
                    height: 144,
                    'tooltip' : {
                    trigger: 'none'
                    }
               }
               data = google.visualization.arrayToDataTable([
                    ['', ''],
                    ['', parseInt(player.skill.fighting)],
                    ['', 7 - parseInt(player.skill.fighting)],
               ]);
               str = isOpp == true ? "fight2" : "fight1";
               chart = new google.visualization.PieChart(document.getElementById(str));
               chart.draw(data, options);

               options = {
                    title: 'Intelligence',
                    fontSize: "16",
                    pieHole: 0.4,
                    pieSliceText: 'none',
                    legend: 'none',
                    slices: {
                         0: { color: isOpp ? '#ff0000' : '#3366cc' },
                         1: { color: 'transparent' }
                    },
                    pieSliceBorderColor: "#ccc", 
                    width: colWidth,
                    height: 144,
                    'tooltip' : {
                    trigger: 'none'
                    }
               }
               data = google.visualization.arrayToDataTable([
                    ['', ''],
                    ['', parseInt(player.skill.intel)],
                    ['', 7 - parseInt(player.skill.intel)],
               ]);
               str = isOpp == true ? "intel2" : "intel1";
               chart = new google.visualization.PieChart(document.getElementById(str));
               chart.draw(data, options);

               options = {
                    title: 'Speed',
                    fontSize: "16",
                    pieHole: 0.4,
                    pieSliceText: 'none',
                    legend: 'none',
                    slices: {
                         0: { color: isOpp ? '#ff0000' : '#3366cc' },
                         1: { color: 'transparent' }
                    },
                    pieSliceBorderColor: "#ccc", 
                    width: colWidth,
                    height: 144,
                    'tooltip' : {
                    trigger: 'none'
                    }
               }
               data = google.visualization.arrayToDataTable([
                    ['', ''],
                    ['', parseInt(player.skill.speed)],
                    ['', 7 - parseInt(player.skill.speed)],
               ]);
               str = isOpp == true ? "speed2" : "speed1";
               chart = new google.visualization.PieChart(document.getElementById(str));
               chart.draw(data, options);

               options = {
                    title: 'Strength',
                    fontSize: "16",
                    pieHole: 0.4,
                    pieSliceText: 'none',
                    legend: 'none',
                    slices: {
                         0: { color: isOpp ? '#ff0000' : '#3366cc' },
                         1: { color: 'transparent' }
                    },
                    pieSliceBorderColor: "#ccc", 
                    width: colWidth,
                    height: 144,
                    'tooltip' : {
                    trigger: 'none'
                    }
               }
               data = google.visualization.arrayToDataTable([
                    ['', ''],
                    ['', parseInt(player.skill.strength)],
                    ['', 7 - parseInt(player.skill.strength)],
               ]);
               str = isOpp == true ? "str2" : "str1";
               chart = new google.visualization.PieChart(document.getElementById(str));
               chart.draw(data, options);

               options = {
                    title: 'Gadget Reliance',
                    fontSize: "16",
                    pieHole: 0.4,
                    pieSliceText: 'none',
                    legend: 'none',
                    slices: {
                         0: { color: isOpp ? '#ff0000' : '#3366cc' },
                         1: { color: 'transparent' }
                    },
                    pieSliceBorderColor: "#ccc", 
                    width: colWidth,
                    height: 144,
                    'tooltip' : {
                    trigger: 'none'
                    }
               }
               data = google.visualization.arrayToDataTable([
                    ['', ''],
                    ['', 7 - parseInt(player.skill.gizmos)],
                    ['', parseInt(player.skill.gizmos)-1],
               ]);
               str = isOpp == true ? "gizmo2" : "gizmo1";
               chart = new google.visualization.PieChart(document.getElementById(str));
               chart.draw(data, options);
          }
     
          $(document).on ("click", ".charHolder", function(evt){
               let getUrl = `/api/getOpponent/${$(this).data("char")}`;               
               $.ajax({
                    url: getUrl,
                    method: "GET"
               }).then(function (response) {
                    $(".labName2").text(response.char.name);
                    $(".charScreen2").removeClass("hidden");
                    $(".player2").remove("hidden");
                    $(".multiple2").addClass("hidden");
                    $(".playerImg2").attr("src",response.char.img);
                    popCharts(response.char, $(".player2"), true);
               });
          })