module.exports = function(context) {
    var query = context.data.root.query
    return "Hello " + query.name + query.suffix
}