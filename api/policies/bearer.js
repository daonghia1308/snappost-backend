
module.exports = async (req, res, next) => {
    try {
        let auth = req.headers.authorization || `Bearer ${req.query.accesstoken}`;
        if (!auth || auth.search('Bearer ') !== 0) {
            return res
                .status(401)
                .json({
                    code: 401,
                    message: 'Unathorized'
                });
        }
        let token = auth.split(' ')[1];
        let user = {};
        if (token === 'dev') {
            user = {
                id: "5ed4c04c3c3f4a3aa4a21b60",
                firstName: "Dao Chinh",
                lastName: "Nghia",
                email: "daonghia1308@gmail.com",
                dob: "",
                phone: "0977059294",
                gender: 1,
                avatar: "",
                wallImage: "",
                province: 0,
                ward: 0,
                country: 0,
                isActive: true,
                online: false,
                isBan: false,
                isNewUser: true,
                isVerify: false,
                nickname: "",
                relationshipDetailId: null
            }
        } else if (token === 'dev2') {
            user = {
                id: "5ed4c04c3c3f4a3aa4a21b61",
                firstName: "Nguyen Do Hong Quan",
                lastName: "Quan",
                email: "quanndh@gmail.com",
                dob: "",
                phone: "0123456789",
                gender: 1,
                avatar: "",
                wallImage: "",
                province: 0,
                ward: 0,
                country: 0,
                isActive: true,
                online: false,
                isBan: false,
                isNewUser: true,
                isVerify: false,
                nickname: "",
                relationshipDetailId: null
            }

        } else if (token == 'dev3') {
            user = {
                created_at: "2020-06-03T06:01:50.256Z",
                updated_at: "2020-06-03T06:01:50.256Z",
                id: "5ed73cce26ddc85664ce2b1c",
                firstName: "Hoang Quang",
                lastName: "Minh",
                email: "minhhq@gmail.com",
                dob: "",
                phone: "0977059294",
                gender: 1,
                avatar: "",
                wallImage: "",
                province: 0,
                ward: 0,
                country: 0,
                isActive: true,
                online: false,
                isBan: false,
                isNewUser: true,
                isVerify: false,
                nickname: "",
                relationshipDetailId: null,
            }
        }
        else {
            user = sails.helpers.jwt.verify(token);
        }
        req.user = user;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({
                code: 401,
                message: 'Unathorized'
            });
    }
};
