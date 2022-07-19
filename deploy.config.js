module.exports = {
	apps: [
    {
    	name: 'txclass-pc',
    	script: './app.js',
    	env: {
    		COMMON_VARIABLE: 'true'
    	},
    	env_production: {
    		NODE_ENV: 'production'
    	}
    }
	],

	deploy: {
		production: {
			user: 'root',
			host: '47.96.134.225',
			ref: 'origin/master',
			repo: 'https://github.com/hopelessfree/txclass-pc.git',
			path: '/www/txclass-pc/production',
			'pre-deploy': 'git fetch --all',
			'post-deploy': 'yarn && yarn prd && pm2 startOrRestart deploy.config.js --env production'
		}
	}
}