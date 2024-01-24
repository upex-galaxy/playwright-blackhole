import { type PlaywrightTestConfig, devices } from '@playwright/test';
import config from './playwright.config';
import _ from 'lodash';

const overrides: PlaywrightTestConfig = {
    workers: 4,
    retries: 2,
    reporter: [
        ['./tests/custom-reporter.ts'],
		['html', { outputFolder: 'test-html-report/iphone', open: 'never' }],
		['junit', { outputFolder: 'test-junit-report', outputFile: 'test-junit-report/iphone-importer-report.xml' }],
		['allure-playwright'],
    ],
}

const merged = _.merge(config, overrides);
export default merged;