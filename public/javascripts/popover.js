let main = function () {

    $('.md-card').on('click', (event) => {

        const movieID = $(event.target).parents('.md-card').attr('movie');


    });

};

main();
