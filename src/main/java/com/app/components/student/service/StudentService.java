package com.app.components.student.service;

import java.text.SimpleDateFormat;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor.HSSFColorPredefined;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.code.StudentStatusCode;
import com.app.common.exception.ApplicationException;
import com.app.components.counse.data.CounseDao;
import com.app.components.counse.data.CounseEntity;
import com.app.components.data.data.LeaveDao;
import com.app.components.data.data.LeaveEntity;
import com.app.components.member.data.MemberEntity;
import com.app.components.sibling.data.SiblingDao;
import com.app.components.sibling.data.SiblingEntity;
import com.app.components.sibling.data.SiblingJoinDto;
import com.app.components.student.data.StudentDao;
import com.app.components.student.data.StudentDto;
import com.app.components.student.data.StudentEntity;
import com.app.components.student.data.StudentNameDto;
import com.app.components.student.data.StudentOneDto;
import com.app.components.student.param.CreateInParam;
import com.app.components.student.param.ReadInParam;
import com.app.components.student.param.ReadLatestInParam;
import com.app.components.student.param.ReadOutParam;
import com.app.components.student.param.StatusUpdateInParam;
import com.app.components.student.param.StudentNameInParam;
import com.app.components.student.param.StudentOneOutParam;
import com.app.components.student.param.UpdateInParam;
import com.app.security.Crypto;
import com.app.security.Principal;
import com.app.security.XssClean;
import com.app.status.ErrorStatus;

@Service
public class StudentService {

	@Autowired
	private SqlSession sqlSession;
	
	public ReadOutParam readAll(ReadInParam inParam){
		
		ReadOutParam outParam = sqlSession.getMapper(StudentDao.class).countAll();
		
		List<StudentDto> result = sqlSession.getMapper(StudentDao.class).readAll(inParam);
		

		result.forEach(e->{
			e.setPhone(Crypto.decode(e.getPhone()));
			e.setParentPhone(Crypto.decode(e.getParentPhone()));
			e.setAddressInput(Crypto.decode(e.getAddressInput()));
		});
		
		outParam.setStudents(result);
		
		return outParam;
	}
	
	@Transactional(rollbackFor=Exception.class)
	public int createStudent(CreateInParam inParam, String email) {
		
		String school = "미입력";
		int gradeCode = 0;
		

		if(inParam.getHiSchool() != null && !inParam.getHiSchool().isEmpty()) {
			
			school = inParam.getHiSchool();
			gradeCode = 3;
			
		}else if(inParam.getMdSchool() != null && !inParam.getMdSchool().isEmpty()){
			
			school = inParam.getMdSchool();
			gradeCode = 2;
			
		}else if(inParam.getElSchool() != null && !inParam.getElSchool().isEmpty()) {
			
			school = inParam.getElSchool();
			gradeCode = 1;
			
		}
		
		
		StudentEntity entity = StudentEntity.builder()
				.name(XssClean.cleanXSS(inParam.getName()))
				.gender(inParam.getGender())
				.grade(inParam.getGrade())
				.gradeCode(gradeCode)
				.status(inParam.getStatus())
				.eSchool(XssClean.cleanXSS(inParam.getElSchool()))
				.mSchool(XssClean.cleanXSS(inParam.getMdSchool()))
				.hSchool(XssClean.cleanXSS(inParam.getHiSchool()))
				.school(XssClean.cleanXSS(school))
				.phone(Crypto.encode(XssClean.cleanXSS(inParam.getPhone())))
				.parentPhone(Crypto.encode(XssClean.cleanXSS(inParam.getParentPhone())))
				.zoneCode(XssClean.cleanXSS(inParam.getZoneCode()))
				.addressApi(XssClean.cleanXSS(inParam.getAddressApi()))
				.addressInput(Crypto.encode(XssClean.cleanXSS(inParam.getAddressInput())))
				.car(inParam.getCar())
				.recommend(XssClean.cleanXSS(inParam.getRecommend()))
				.writerEmail(email)
				.build();

				
		StudentEntity nameCheck = sqlSession.getMapper(StudentDao.class).studentCheck(XssClean.cleanXSS(inParam.getName()));
		
		if(nameCheck != null) throw new ApplicationException(ErrorStatus.DUPLICATE_STUDENT);
		
		sqlSession.getMapper(StudentDao.class).createOne(entity);
		
		int studentIdx = entity.getIdx();
		
		List<SiblingEntity> sibling = inParam.getSibling();
		
		for(int i = 0; i<sibling.size(); i++) {
			SiblingEntity se = sibling.get(i);
			se.setStudentIdx(studentIdx);
			sqlSession.getMapper(SiblingDao.class).createOne(se);
		}
		
		return studentIdx;
		
	}
	
	@Transactional(rollbackFor=Exception.class)
	@CacheEvict(value="studentLatest", allEntries = true)
	public void updateStudent(UpdateInParam inParam, String email) {
		
		String school = "미입력";
		int gradeCode = 0;

		if(inParam.getHiSchool() != null && !inParam.getHiSchool().isEmpty()) {
			
			school = inParam.getHiSchool();
			gradeCode = 3;
			
		}else if(inParam.getMdSchool() != null && !inParam.getMdSchool().isEmpty()){
			
			school = inParam.getMdSchool();
			gradeCode = 2;
			
		}else if(inParam.getElSchool() != null && !inParam.getElSchool().isEmpty()) {
			
			school = inParam.getElSchool();
			gradeCode = 1;
			
		}
		
		StudentOneDto student = sqlSession.getMapper(StudentDao.class).studentOne(inParam.getStudentIdx());
		
		
		StudentEntity entity = StudentEntity.builder()
				.idx(inParam.getStudentIdx())
				.name(XssClean.cleanXSS(inParam.getName()))
				.gender(inParam.getGender())
				.grade(inParam.getGrade())
				.gradeCode(gradeCode)
				.status(inParam.getStatus())
				.eSchool(XssClean.cleanXSS(inParam.getElSchool()))
				.mSchool(XssClean.cleanXSS(inParam.getMdSchool()))
				.hSchool(XssClean.cleanXSS(inParam.getHiSchool()))
				.school(XssClean.cleanXSS(school))
				.phone(Crypto.encode(XssClean.cleanXSS(inParam.getPhone())))
				.parentPhone(Crypto.encode(XssClean.cleanXSS(inParam.getParentPhone())))
				.zoneCode(XssClean.cleanXSS(inParam.getZoneCode()))
				.addressApi(XssClean.cleanXSS(inParam.getAddressApi()))
				.addressInput(Crypto.encode(XssClean.cleanXSS(inParam.getAddressInput())))
				.car(inParam.getCar())
				.recommend(XssClean.cleanXSS(inParam.getRecommend()))
				.writerEmail(email)
				.hrtEmail(inParam.getHrtEmail())
				.build();
		
		LeaveEntity leaveIn = LeaveEntity.builder()
				.studentIdx(student.getIdx())
				.hrtEmail(student.getHrtEmail())
				.build();
		
		
			
		// 휴원처리의 로직
		if(entity.getStatus() == 3) {
			leaveIn.setStatus(0);
			
			if(student.getHrtEmail() == null) {
				throw new ApplicationException(ErrorStatus.NOT_HRT_LEAVE);
			}
			
			sqlSession.getMapper(LeaveDao.class).createOne(leaveIn);

		// 입학 처리의 로직
		} else if(entity.getStatus() == 1) {
			leaveIn.setStatus(1);
			
			if(entity.getHrtEmail() == null || "null".equalsIgnoreCase(entity.getHrtEmail())) {
				throw new ApplicationException(ErrorStatus.NOT_HRT_IN);
			}
			
			sqlSession.getMapper(LeaveDao.class).updateOne(leaveIn);
		}
			
		
		
		
		
		// 업데이트 처리
		sqlSession.getMapper(StudentDao.class).updateOne(entity);
		
		List<SiblingJoinDto> sibling = inParam.getSibling();
		
		List<Integer> deleteIdx = inParam.getDeleteIdx();
		
		if(deleteIdx != null) {

			for(int i = 0; i<deleteIdx.size(); i++) {
				sqlSession.getMapper(SiblingDao.class).deleteOne(deleteIdx.get(i));
			}
		}

		

		for(int i = 0; i<sibling.size(); i++) {
			SiblingJoinDto e = sibling.get(i);
			SiblingEntity in = SiblingEntity.builder()
					.idx(e.getSiblingIdx())
					.studentIdx(inParam.getStudentIdx())
					.relation(e.getSiblingRelation())
					.name(e.getSiblingName())
					.school(e.getSiblingSchool())
					.grade(e.getSiblingGrade())
					.gradeCode(e.getSiblingGradeCode())
					.build();
					
			if(e.isSiblingUpdated()) {
				sqlSession.getMapper(SiblingDao.class).updateOne(in);
			}else if(in.getIdx() == null){
				sqlSession.getMapper(SiblingDao.class).createOne(in);
			}
			
		}
		
	}
	
	public List<StudentNameDto> readAllNames(StudentNameInParam inParam){
		return sqlSession.getMapper(StudentDao.class).readAllNames(inParam);
	}
	
	public StudentEntity readOne(int idx) {
		
		StudentEntity result = sqlSession.getMapper(StudentDao.class).readOne(idx);
		
		result.setPhone(Crypto.decode(result.getPhone()));
		result.setParentPhone(Crypto.decode(result.getParentPhone()));
		result.setAddressInput(Crypto.decode(result.getAddressInput()));
				
		return result;
	}
	
	public Workbook studentListExcel(ReadInParam inParam) {
		
		List<StudentDto> result = sqlSession.getMapper(StudentDao.class).readAll(inParam);
		

		result.forEach(e->{
			e.setPhone(Crypto.decode(e.getPhone()));
			e.setParentPhone(Crypto.decode(e.getParentPhone()));
			e.setAddressInput(Crypto.decode(e.getAddressInput()));
		});
		
		Workbook wb = new HSSFWorkbook();
	    Sheet sheet = wb.createSheet("제일학원 학생명부");
	    
	    Row row = null;
	    Cell cell = null;
	    int rowNo = 0;
	    

	    CellStyle headStyle = wb.createCellStyle();


	    headStyle.setBorderTop(BorderStyle.THIN);
	    headStyle.setBorderBottom(BorderStyle.THIN);
	    headStyle.setBorderLeft(BorderStyle.THIN);
	    headStyle.setBorderRight(BorderStyle.THIN);


	    headStyle.setFillForegroundColor(HSSFColorPredefined.YELLOW.getIndex());
	    headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);


	    headStyle.setAlignment(HorizontalAlignment.CENTER);


	    CellStyle bodyStyle = wb.createCellStyle();
	    bodyStyle.setBorderTop(BorderStyle.THIN);
	    bodyStyle.setBorderBottom(BorderStyle.THIN);
	    bodyStyle.setBorderLeft(BorderStyle.THIN);
	    bodyStyle.setBorderRight(BorderStyle.THIN);


	    row = sheet.createRow(rowNo++);
	    cell = row.createCell(0);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("이름");
	    
	    cell = row.createCell(1);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("상태");
	    
	    cell = row.createCell(2);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("초등학교");
	    
	    cell = row.createCell(3);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("중학교");
	    
	    cell = row.createCell(4);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("고등학교");
	    
	    cell = row.createCell(5);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("학년");
	    
	    cell = row.createCell(6);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("본인 연락처");
	    
	    cell = row.createCell(7);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("부모 연락처");
	    
	    cell = row.createCell(8);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("우편 번호");
	    
	    cell = row.createCell(9);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("주소");
	    
	    cell = row.createCell(10);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("등록일");
	    
	    cell = row.createCell(11);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("반 편성(일반)");
	    
	    cell = row.createCell(12);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("반 편성(시험기간)");
	    
	    cell = row.createCell(13);
	    cell.setCellStyle(headStyle);
	    cell.setCellValue("담임");
	    
	    for(StudentDto dto : result) {
	    	row = sheet.createRow(rowNo++);
	    	
	        cell = row.createCell(0);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getName());

	        cell = row.createCell(1);
	        cell.setCellStyle(bodyStyle);
	        
	        cell.setCellValue(StudentStatusCode.getStudentStatus(dto.getStatus()));

	        cell = row.createCell(2);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getESchool());
	        
	        cell = row.createCell(3);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getMSchool());
	        
	        cell = row.createCell(4);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getHSchool());
	        
	        cell = row.createCell(5);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getGrade());
	        
	        cell = row.createCell(6);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getPhone());
	        
	        cell = row.createCell(7);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getParentPhone());
	        
	        cell = row.createCell(8);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getZoneCode());
	        
	        cell = row.createCell(9);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getAddressApi() + " " + dto.getAddressInput());
	        
	        cell = row.createCell(10);
	        cell.setCellStyle(bodyStyle);
	        String regDate = dto.getRegDate() == null ? "" : new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(dto.getRegDate());
	        cell.setCellValue(regDate);
	        
	        cell = row.createCell(11);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getClassNomal());
	        
	        cell = row.createCell(12);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getClassTest());
	        
	        cell = row.createCell(13);
	        cell.setCellStyle(bodyStyle);
	        cell.setCellValue(dto.getHrtName());
	        
	    }
	    
	    for (int i = 0; i <result.size(); i++){ 
	    	sheet.autoSizeColumn(i); 
	    	sheet.setColumnWidth(i, (sheet.getColumnWidth(i)) + 1000); 
	    }
	    
	    return wb;
	}
	
	public StudentOneOutParam readStudentOne(int idx) {
		StudentOneDto result = sqlSession.getMapper(StudentDao.class).studentOne(idx);
		
		if(result == null) {
			throw new ApplicationException(ErrorStatus.INVALID_ACCESS);
		}
		
		if(result.getLeaveDate() != null) {
			result.setLeaveDate(result.getLeaveDate().replace("-", "."));
		}
		
		result.setPhone(Crypto.decode(result.getPhone()));
		result.setParentPhone(Crypto.decode(result.getParentPhone()));
		result.setAddressInput(Crypto.decode(result.getAddressInput()));
		

		List<CounseEntity> counse = sqlSession.getMapper(CounseDao.class).readLatest(idx);
		
		return StudentOneOutParam.builder().student(result).counse(counse).build();
	}
	
	public StudentOneDto readUpdateStudentOne(int idx) {
		StudentOneDto result = sqlSession.getMapper(StudentDao.class).studentOne(idx);
		result.setPhone(Crypto.decode(result.getPhone()));
		result.setParentPhone(Crypto.decode(result.getParentPhone()));
		result.setAddressInput(Crypto.decode(result.getAddressInput()));
		return result;
	}
	
	@CacheEvict(value="studentLatest", allEntries = true)
	public void updateStatus(StatusUpdateInParam inParam) {
		sqlSession.getMapper(StudentDao.class).updateStatus(inParam);
	}

	@Transactional(rollbackFor=Exception.class)
	public void deleteStudent(int idx) {
		// 휴원생 처리
		LeaveEntity leaveIn = LeaveEntity.builder()
				.studentIdx(idx)
				.status(2)
				.build();
		sqlSession.getMapper(LeaveDao.class).updateOne(leaveIn);
		sqlSession.getMapper(StudentDao.class).deleteOne(idx);
	}
	
	@Cacheable(value="studentLatest")
	public List<StudentDto> readLatest(ReadLatestInParam inParam){
		return sqlSession.getMapper(StudentDao.class).readLatest(inParam);
	}
	
	public boolean isHrtStudent(int studentIdx) {
		Principal user = (Principal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		MemberEntity member = user.getMember();
		String email = member.getEmail();
		int roleCode = member.getRoleCode();
		
		// 담임인 경우에만 처리
		if(roleCode==1) {
			StudentEntity student = sqlSession.getMapper(StudentDao.class).readOne(studentIdx);
			
			if(!email.equalsIgnoreCase(student.getHrtEmail())) {
				return false;
			}
		}
		
		
		return true;
		
	}
}
