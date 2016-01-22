'use strict';

module.exports = (request, reply) => {

  let User = request.collections.users;
  let requestUser = request.payload;

  User.findOne({ email: requestUser.email })
      .exec(function(err, user) {
        if (err) console.error(err);

        if (user) {
          User.comparePassword(requestUser.password, user.password, (res) => {
            if (!res) return reply().code(401);

            User.findOne({id: user.id}).populate('medications')
                .exec(function(err, medications) {
                  if (err) console.error(err);
                  
                  let session = {
                    id: user.id,
                    valid: true
                  };

                  User.signToken(session, (token) => {
                    return reply(medications).code(202)
                            .header('Authorization', token);
                  });
                });
          });
        } else {
          return reply().code(404);
        }
      });
};
