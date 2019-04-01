module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_picture: {
            type: DataTypes.STRING,
            defaultValue: "/images/profile-default.jpg",
            allowNull: false
        },
        insurance_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        insurance_date: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return user;
};