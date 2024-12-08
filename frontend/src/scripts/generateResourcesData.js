// scripts/generateResourcesData.js

const fs = require('fs');
const path = require('path');s

// Define the base directory for resources
const resourcesBaseDir = path.join(__dirname, '../src/assets/swe206-resources');

// Define the output file path
const outputFilePath = path.join(__dirname, '../src/resourcesData.js');

// Define category titles (ensure consistency with your folder names)
const categoryTitles = {
  'old-exams': 'Old Exams',
  notes: 'Notes',
  quizzes: 'Quizzes',
  extra: 'Extra Resources',
};

// Supported file extensions
const supportedExtensions = ['.pdf', '.docx', '.doc', '.pptx', '.ppt', '.xlsx', '.xls'];

// Function to convert bytes to MB with two decimal places
const bytesToMB = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(2);
};

// Function to generate import statements and resource objects
const generateResourcesData = () => {
  let importStatements = '';
  let resourcesObject = 'const resourcesData = {\n';

  Object.keys(categoryTitles).forEach((category) => {
    const categoryDir = path.join(resourcesBaseDir, category);
    if (!fs.existsSync(categoryDir)) {
      console.warn(`Warning: Directory for category "${category}" does not exist at path: ${categoryDir}`);
      resourcesObject += `  '${category}': [],\n`;
      return;
    }

    const files = fs.readdirSync(categoryDir).filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return supportedExtensions.includes(ext);
    });

    resourcesObject += `  '${category}': [\n`;

    files.forEach((file, index) => {
      const filePath = `./assets/swe206-resources/${category}/${file}`;
      const variableName = `${category}_${index}_${path.parse(file).name}`.replace(/[^a-zA-Z0-9_]/g, '_');

      // Get file stats to determine size
      const absoluteFilePath = path.join(categoryDir, file);
      const stats = fs.statSync(absoluteFilePath);
      const fileSizeMB = bytesToMB(stats.size);

      // Generate import statement
      importStatements += `import ${variableName} from '${filePath}';\n`;

      // Determine file type based on extension
      const ext = path.extname(file).toLowerCase().replace('.', '').toUpperCase();

      // Assign current date as date uploaded
      const currentDate = new Date().toISOString().split('T')[0];

      // Add resource object
      resourcesObject += `    {\n`;
      resourcesObject += `      fileName: '${file}',\n`;
      resourcesObject += `      type: '${ext}',\n`;
      resourcesObject += `      size: '${fileSizeMB} MB',\n`;
      resourcesObject += `      dateUploaded: '${currentDate}',\n`;
      resourcesObject += `      url: ${variableName},\n`;
      resourcesObject += `    },\n`;
    });

    resourcesObject += `  ],\n`;
  });

  resourcesObject += '};\n\n';

  // Define category titles
  let categoryTitlesObject = 'const categoryTitles = ' + JSON.stringify(categoryTitles, null, 2) + ';\n\n';

  // Export the objects
  let exportStatements = 'export { resourcesData, categoryTitles };\n';

  // Combine all parts
  const fileContent = `${importStatements}\n${resourcesObject}${categoryTitlesObject}${exportStatements}`;

  // Write to the output file
  fs.writeFileSync(outputFilePath, fileContent, 'utf8');
  console.log(`resourcesData.js has been generated at ${outputFilePath}`);
};

// Execute the function
generateResourcesData();
