import config from '../config/config';

export default class Format {
  static imageUrl(url) {
		if (!url)
			return ""

		if (url.includes("http://") || url.includes("https://"))
			return url
		else
			return  config.server_url + url
	}
}
