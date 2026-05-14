#!/usr/bin/env tsx

/**
 * Page validation script to ensure all pages have proper hero images and metadata
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const appDir = join(__dirname, "..", "app");

interface PageValidationResult {
  path: string;
  hasHero: boolean;
  heroImage: string;
  hasMetadata: boolean;
  hasBreadcrumb: boolean;
  errors: string[];
  warnings: string[];
}

const VALID_IMAGES = [
  "/images/React1.jpeg",
  "/images/React2.jpeg", 
  "/images/React3.jpeg",
  "/images/React4.jpeg",
  "/images/React5.jpeg",
  "/images/React6.jpeg",
  "/images/React7.jpeg",
  "/images/React8.jpeg",
  "/images/Geo.JPG",
  "/images/React10.jpeg",
  "/images/React11.jpeg",
  "/images/React12.jpeg",
];

function validatePage(filePath: string): PageValidationResult {
  const content = readFileSync(filePath, "utf-8");
  const result: PageValidationResult = {
    path: filePath.replace(appDir, "").replace(/\\/g, "/"),
    hasHero: false,
    heroImage: "",
    hasMetadata: false,
    hasBreadcrumb: false,
    errors: [],
    warnings: [],
  };

  // Check for SitePageHero usage
  const heroMatch = content.match(/<SitePageHero[^>]*>/);
  if (heroMatch) {
    result.hasHero = true;
    
    // Extract imageSrc
    const imageMatch = content.match(/imageSrc="([^"]+)"/);
    if (imageMatch) {
      result.heroImage = imageMatch[1];
      
      // Validate image exists
      if (!VALID_IMAGES.includes(result.heroImage)) {
        result.errors.push(`Invalid hero image: ${result.heroImage}`);
      }
    } else {
      result.errors.push("No imageSrc found in SitePageHero");
    }

    // Check for breadcrumb
    const breadcrumbMatch = content.match(/showBreadcrumb={true}/);
    if (breadcrumbMatch) {
      result.hasBreadcrumb = true;
    } else {
      result.warnings.push("No breadcrumb navigation found");
    }
  } else {
    result.errors.push("No SitePageHero component found");
  }

  // Check for metadata export
  const metadataMatch = content.match(/export const metadata.*?Metadata.*?=/);
  if (metadataMatch) {
    result.hasMetadata = true;
  } else {
    result.warnings.push("No metadata export found for SEO");
  }

  return result;
}

function findPageFiles(dir: string, pages: string[] = []): string[] {
  const files = readdirSync(dir);
  
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      findPageFiles(fullPath, pages);
    } else if (file === "page.tsx") {
      pages.push(fullPath);
    }
  }
  
  return pages;
}

function main() {
  console.log("🔍 Validating React Now FC Academy pages...\n");
  
  const pageFiles = findPageFiles(appDir);
  const results: PageValidationResult[] = [];
  
  for (const pageFile of pageFiles) {
    const result = validatePage(pageFile);
    results.push(result);
  }
  
  // Print results
  let totalErrors = 0;
  let totalWarnings = 0;
  
  for (const result of results) {
    console.log(`📄 ${result.path}`);
    console.log(`   ✅ Hero: ${result.hasHero ? "Yes" : "No"}`);
    console.log(`   🖼️  Image: ${result.heroImage || "None"}`);
    console.log(`   📊 Metadata: ${result.hasMetadata ? "Yes" : "No"}`);
    console.log(`   🧭 Breadcrumb: ${result.hasBreadcrumb ? "Yes" : "No"}`);
    
    if (result.errors.length > 0) {
      console.log(`   ❌ Errors:`);
      result.errors.forEach(error => console.log(`      - ${error}`));
      totalErrors += result.errors.length;
    }
    
    if (result.warnings.length > 0) {
      console.log(`   ⚠️  Warnings:`);
      result.warnings.forEach(warning => console.log(`      - ${warning}`));
      totalWarnings += result.warnings.length;
    }
    
    console.log("");
  }
  
  // Summary
  console.log("📊 Summary:");
  console.log(`   Total pages: ${results.length}`);
  console.log(`   Pages with hero: ${results.filter(r => r.hasHero).length}`);
  console.log(`   Pages with metadata: ${results.filter(r => r.hasMetadata).length}`);
  console.log(`   Pages with breadcrumbs: ${results.filter(r => r.hasBreadcrumb).length}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}`);
  
  if (totalErrors > 0) {
    console.log("\n❌ Validation failed with errors!");
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log("\n⚠️  Validation passed with warnings!");
  } else {
    console.log("\n✅ All pages validated successfully!");
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validatePage, findPageFiles };
