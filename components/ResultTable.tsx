
import React from 'react';
import { CertificateRecord } from '../types';

interface ResultTableProps {
  record: CertificateRecord;
}

const LabelCell: React.FC<{ zh: string; en: string }> = ({ zh, en }) => (
  <td className="bg-[#f9f9f9] border border-gray-300 px-4 py-4 w-1/3 text-center">
    <div className="text-[13px] font-bold text-gray-800 leading-tight">{zh}：</div>
    <div className="text-[11px] text-gray-600 mt-1 uppercase font-medium">{en}</div>
  </td>
);

const ValueCell: React.FC<{ value: string }> = ({ value }) => (
  <td className="border border-gray-300 px-6 py-4 text-[14px] font-medium text-gray-900 align-middle">
    {value}
  </td>
);

const ResultTable: React.FC<ResultTableProps> = ({ record }) => {
  return (
    <div className="max-w-[800px] mx-auto bg-white p-4 sm:p-8">
      {/* Main Table */}
      <div className="overflow-hidden border border-gray-300">
        <table className="w-full border-collapse">
          <tbody>
            {/* Row 1 - Cert No */}
            <tr>
              <LabelCell zh="证书编号" en="Certificate No" />
              <ValueCell value={record.certificateNo} />
            </tr>
            {/* Row 2 - Reg No */}
            <tr>
              <LabelCell zh="证书备案号" en="Registration No" />
              <ValueCell value={record.registrationNo} />
            </tr>
            {/* Row 3 - Company Name */}
            <tr>
              <LabelCell zh="公司名称" en="Company Name" />
              <ValueCell value={record.companyName} />
            </tr>
            {/* Row 4 - Company Address */}
            <tr>
              <LabelCell zh="公司地址" en="Company Address" />
              <ValueCell value={record.companyAddress} />
            </tr>
            {/* Row 5 - Product Name */}
            <tr>
              <LabelCell zh="产品名称" en="Product Name" />
              <ValueCell value={record.productName} />
            </tr>
            {/* Row 6 - Issued On */}
            <tr>
              <LabelCell zh="认证时间" en="ISSUED ON" />
              <ValueCell value={record.issuedOn} />
            </tr>
            {/* Row 7 - Valid Until */}
            <tr>
              <LabelCell zh="证书期限" en="Valid Until" />
              <ValueCell value={record.validUntil} />
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center border-t border-gray-100 pt-6">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
          Official Digital Verification Result • Verified Secure
        </p>
      </div>
    </div>
  );
};

export default ResultTable;
