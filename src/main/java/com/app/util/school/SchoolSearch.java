package com.app.util.school;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;

@Component
public class SchoolSearch {

	public List<SchoolDto> searchSchoolData(String query) throws Exception {
		
		Document doc = Jsoup.connect("https://www.schoolinfo.go.kr/ei/ss/Pneiss_a01_l0.do")
				.header("origin", "https://www.schoolinfo.go.kr")
				.header("host", "www.schoolinfo.go.kr")
				.header("Accept", "application/json, text/javascript, */*; q=0.01")
				.header("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7")
				.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
				.header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36")
				.header("X-Requested-With", "XMLHttpRequest")
				.data("HG_CD", "")
				.data("SEARCH_KIND", "")
				.data("HG_JONGRYU_GB", "")
				.data("GS_HANGMOK_CD", "")
				.data("GS_HANGMOK_NM", "")
				.data("GU_GUN_CODE", "")
				.data("SIDO_CODE", "")
				.data("GUGUN_CODE", "")
				.data("SRC_HG_NM", query)
				.ignoreContentType(true)
				.timeout(4000)
				.post();
				
			JSONObject jsonObject = new JSONObject(doc.text());
			
			List<SchoolDto> result = new ArrayList<>();
			
			Iterator<String> keys= jsonObject.keys();
			
			while(keys.hasNext()) {
				JSONArray obj = jsonObject.getJSONArray(keys.next());
				for(int i = 0; i < obj.length(); i++) {
					JSONObject item = (JSONObject) obj.get(i);
					SchoolDto dto = SchoolDto.builder().name(item.getString("SCHUL_NM")).location(item.getString("LCTN_NM")).type(item.getString("SCHUL_KND_SC_CODE")).build();
					result.add(dto);
				}
			}
				
			return result;
	}
	
}
