/** Create one item of the content to filling the search page*/
const ListItem = Backbone.View.extend({
    tagName: 'div',
    className: 'col-xs-6 col-sd-6 col-md-4 col-lg-3',
    events: {
        'click .icon-heart': 'addFavorite'
    },

    /**
     * Creates a new ListItem instance
     *
     * @constructs
     * @param {Object} book - one book from response in JSON
     *
     */
    initialize: function(book) {
        this.book = book.toJSON();
    },
    /**
     * This will append the html from file list-item.html
     * along with the current one into the DOM
     *
     * @returns {Object} - html from list-item.html
     *
     */
    render: function() {
        if (localStorage[this.$el.attr('id')]) {
            $.get('src/components/list/list-item-selected.html').done(tpl => this.$el.append(_.template(tpl)(this.book)));
        } else {
            $.get('src/components/list/list-item.html').done(tpl => this.$el.append(_.template(tpl)(this.book)));
        }             
        return this;
    },
    addFavorite: function(e) {
        if ($(e.target).hasClass('selected')) {
            $(e.target).removeClass('selected');
            delete localStorage[this.id];
        } else {
            $(e.target).addClass('selected');
            localStorage[this.id] = JSON.stringify(this.attributes);
        }
    }
});
