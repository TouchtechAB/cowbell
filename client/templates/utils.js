Template.registerHelper('breakLines', function(text) {
    return text.replace(/(\r\n|\n|\r)/gm, '<br>');
});

Template.registerHelper('capitalize', function(text) {
    return capitalizeString(text);
});

Template.registerHelper('stringify', function(value) {
    return stringify(value);
});

Template.registerHelper('niceTime', function(dateTime){
   return moment(dateTime).format('HH:mm:ss');
});

Template.registerHelper('niceDuration', function(minutes){
    return moment.duration(minutes, 'minutes').humanize();
});