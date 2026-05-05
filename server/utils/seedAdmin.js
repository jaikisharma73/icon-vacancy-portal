const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    console.log('--- ADMIN SEEDING START ---');
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.error('❌ Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env');
            return;
        }

        let admin = await User.findOne({ role: 'admin' });
        
        if (admin) {
            console.log(`Found existing admin: ${admin.email}`);
            const isPasswordMatch = await bcrypt.compare(adminPassword, admin.password);
            
            if (admin.email !== adminEmail || !isPasswordMatch) {
                console.log('Credentials mismatch. Updating admin...');
                admin.email = adminEmail;
                admin.password = adminPassword;
                await admin.save();
                console.log('✅ Admin credentials successfully updated');
            } else {
                console.log('✅ Admin credentials already match .env');
            }
        } else {
            console.log('No admin found. Creating new admin...');
            admin = new User({
                email: adminEmail,
                password: adminPassword,
                role: 'admin'
            });
            await admin.save();
            console.log('✅ New admin user created successfully');
        }
    } catch (err) {
        console.error('❌ Error during admin seeding:', err.message);
    }
    console.log('--- ADMIN SEEDING END ---');
};

module.exports = seedAdmin;
